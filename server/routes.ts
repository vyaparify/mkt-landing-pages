import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";

// Hash data for Meta Conversion API (SHA-256)
function hashData(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  let razorpay: Razorpay | null = null;
  
  if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }

  const zohoWebhookUrl = process.env.ZOHO_FLOW_WEBHOOK_URL;

  async function sendToZohoFlow(leadData: { fullName: string; email: string; phone: string; source: string; amount: number; status: string }) {
    if (!zohoWebhookUrl) {
      console.log("Zoho Flow webhook URL not configured, skipping");
      return;
    }

    try {
      const response = await fetch(zohoWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadData.fullName,
          email: leadData.email,
          phone: leadData.phone,
          source: leadData.source,
          amount: leadData.amount,
          status: leadData.status,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Zoho Flow webhook error:", response.status, await response.text());
      } else {
        console.log("Lead sent to Zoho Flow successfully");
      }
    } catch (error) {
      console.error("Failed to send lead to Zoho Flow:", error);
    }
  }

  app.post("/api/leads/create", async (req, res) => {
    try {
      const { fullName, email, phone, source } = req.body;
      
      if (!fullName || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required" });
      }
      
      const lead = await storage.createLead({
        fullName,
        email,
        phone,
        source: source || "unknown",
        amount: 7999,
        status: "initiated",
      });

      // Send to Zoho Flow webhook (non-blocking)
      sendToZohoFlow({
        fullName,
        email,
        phone,
        source: source || "unknown",
        amount: 7999,
        status: "initiated",
      });
      
      res.json(lead);
    } catch (error) {
      console.error("Lead creation error:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      const { amount, customerInfo } = req.body;

      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `vyaparify_${Date.now()}`,
        notes: {
          customerName: customerInfo.fullName || customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          plan: "Vyaparify Premium Annual",
        },
      };

      const order = await razorpay.orders.create(options);

      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayKeyId,
      });
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/razorpay/verify-payment", async (req, res) => {
    try {
      if (!razorpayKeySecret) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(sign)
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        res.json({ verified: true, paymentId: razorpay_payment_id });
      } else {
        res.status(400).json({ verified: false, error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Admin endpoints
  const adminPassword = process.env.ADMIN_PASSWORD;

  app.get("/api/submissions/list", async (req, res) => {
    try {
      const password = req.headers["x-admin-password"];
      
      if (!adminPassword || password !== adminPassword) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const submissions = await storage.getAllLeads();
      res.json({ submissions });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.post("/api/submissions/create", async (req, res) => {
    try {
      const { fullName, email, phone, amount, status, source, razorpayOrderId, razorpayPaymentId } = req.body;
      
      const lead = await storage.createLead({
        fullName,
        email,
        phone,
        source: source || "checkout",
        amount: amount || 7999,
        status: status || "pending",
      });
      
      if (razorpayOrderId || razorpayPaymentId) {
        await storage.updateLeadStatus(lead.id, status, razorpayOrderId, razorpayPaymentId);
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Submission creation error:", error);
      res.status(500).json({ error: "Failed to create submission" });
    }
  });

  app.post("/api/admin/verify", async (req, res) => {
    const { password } = req.body;
    
    if (!adminPassword) {
      return res.status(500).json({ error: "Admin password not configured" });
    }
    
    if (password === adminPassword) {
      res.json({ verified: true });
    } else {
      res.status(401).json({ verified: false });
    }
  });

  // Meta Conversion API endpoint
  const metaPixelId = process.env.META_PIXEL_ID;
  const metaAccessToken = process.env.META_ACCESS_TOKEN;

  app.post("/api/meta/conversion", async (req, res) => {
    try {
      if (!metaPixelId || !metaAccessToken) {
        console.log("Meta Conversion API not configured");
        return res.json({ success: false, message: "Meta API not configured" });
      }

      const { eventName, eventTime, userData, customData, eventSourceUrl, actionSource } = req.body;

      if (!eventName) {
        return res.status(400).json({ error: "Event name is required" });
      }

      const eventData = {
        event_name: eventName,
        event_time: eventTime || Math.floor(Date.now() / 1000),
        event_source_url: eventSourceUrl || "",
        action_source: actionSource || "website",
        user_data: {
          em: userData?.email ? hashData(userData.email.toLowerCase().trim()) : undefined,
          ph: userData?.phone ? hashData(userData.phone.replace(/[^0-9]/g, "")) : undefined,
          fn: userData?.firstName ? hashData(userData.firstName.toLowerCase().trim()) : undefined,
          ln: userData?.lastName ? hashData(userData.lastName.toLowerCase().trim()) : undefined,
          client_ip_address: req.ip || req.headers["x-forwarded-for"] || "",
          client_user_agent: req.headers["user-agent"] || "",
          fbc: userData?.fbc || undefined,
          fbp: userData?.fbp || undefined,
        },
        custom_data: customData || {},
      };

      // Remove undefined values from user_data
      Object.keys(eventData.user_data).forEach(key => {
        if (eventData.user_data[key as keyof typeof eventData.user_data] === undefined) {
          delete eventData.user_data[key as keyof typeof eventData.user_data];
        }
      });

      const payload = {
        data: [eventData],
        access_token: metaAccessToken,
      };

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${metaPixelId}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Meta Conversion API error:", result);
        return res.status(response.status).json({ error: "Meta API error", details: result });
      }

      console.log("Meta Conversion API success:", result);
      res.json({ success: true, result });
    } catch (error) {
      console.error("Meta Conversion API error:", error);
      res.status(500).json({ error: "Failed to send event to Meta" });
    }
  });

  return httpServer;
}
