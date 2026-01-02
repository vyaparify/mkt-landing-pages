import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

  try {
    const { fullName, email, phone, amount, razorpayOrderId, razorpayPaymentId, status } = req.body;
    
    if (!fullName || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await client.connect();
    const result = await client.query(
      `INSERT INTO payment_submissions (full_name, email, phone, amount, razorpay_order_id, razorpay_payment_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [fullName, email, phone, amount, razorpayOrderId || null, razorpayPaymentId || null, status || 'pending']
    );
    await client.end();

    res.status(200).json({ success: true, id: result.rows[0]?.id });
  } catch (error) {
    console.error("Error saving submission:", error);
    await client.end().catch(() => {});
    res.status(500).json({ error: "Failed to save submission" });
  }
}
