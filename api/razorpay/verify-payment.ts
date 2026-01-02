import type { IncomingMessage, ServerResponse } from 'http';
import crypto from "crypto";

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

  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpayKeySecret) {
    return res.status(500).json({ error: "Payment gateway not configured" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.status(200).json({ verified: true, paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ verified: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
}
