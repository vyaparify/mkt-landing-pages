import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }

  const authHeader = req.headers['x-admin-password'];
  
  if (authHeader !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    const result = await client.query(`
      SELECT id, full_name as "fullName", email, phone, amount, razorpay_order_id as "razorpayOrderId", razorpay_payment_id as "razorpayPaymentId", status, source, created_at as "createdAt"
      FROM payment_submissions
      ORDER BY created_at DESC
      LIMIT 100
    `);
    await client.end();

    res.status(200).json({ submissions: result.rows });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    await client.end().catch(() => {});
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
}
