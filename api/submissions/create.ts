import type { IncomingMessage, ServerResponse } from 'http';
import { neon } from '@neondatabase/serverless';

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

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    const { fullName, email, phone, amount, razorpayOrderId, razorpayPaymentId, status } = req.body;

    const result = await sql`
      INSERT INTO payment_submissions (full_name, email, phone, amount, razorpay_order_id, razorpay_payment_id, status)
      VALUES (${fullName}, ${email}, ${phone}, ${amount}, ${razorpayOrderId || null}, ${razorpayPaymentId || null}, ${status || 'pending'})
      RETURNING id
    `;

    res.status(200).json({ success: true, id: result[0]?.id });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ error: "Failed to save submission" });
  }
}
