import type { IncomingMessage, ServerResponse } from 'http';
import Razorpay from "razorpay";

interface VercelRequest extends IncomingMessage {
  body: any;
  query: Record<string, string | string[]>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpayKeyId || !razorpayKeySecret) {
    return res.status(500).json({ error: "Payment gateway not configured" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const { amount, customerInfo } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `vyaparify_${Date.now()}`,
      notes: {
        customerName: customerInfo?.fullName || customerInfo?.name || '',
        customerEmail: customerInfo?.email || '',
        customerPhone: customerInfo?.phone || '',
        plan: "Vyaparify Premium Annual",
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
