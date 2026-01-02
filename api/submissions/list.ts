import type { IncomingMessage, ServerResponse } from 'http';
import { neon } from '@neondatabase/serverless';

interface VercelRequest extends IncomingMessage {
  body: any;
  query: Record<string, string | string[]>;
  headers: any;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

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

  try {
    const sql = neon(databaseUrl);
    const submissions = await sql`
      SELECT id, full_name, email, phone, amount, razorpay_order_id, razorpay_payment_id, status, created_at
      FROM payment_submissions
      ORDER BY created_at DESC
      LIMIT 100
    `;

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
}
