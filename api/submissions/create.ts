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

async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
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
    const body = req.body || await parseBody(req);
    const sql = neon(databaseUrl);
    const { fullName, email, phone, amount, razorpayOrderId, razorpayPaymentId, status } = body;
    
    if (!fullName || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
