import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";

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

  return httpServer;
}
