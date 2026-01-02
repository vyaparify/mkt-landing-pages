import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from "razorpay";

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
      receipt: `receipt_${Date.now()}`,
      notes: {
        customer_name: customerInfo?.name || "",
        customer_email: customerInfo?.email || "",
        customer_phone: customerInfo?.phone || "",
      },
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, keyId: razorpayKeyId });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
}
