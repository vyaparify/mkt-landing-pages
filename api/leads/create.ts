import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

async function sendToZohoFlow(leadData: { fullName: string; email: string; phone: string; source: string; amount: number; status: string }) {
  const zohoWebhookUrl = process.env.ZOHO_FLOW_WEBHOOK_URL;
  
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
    const { fullName, email, phone, source } = req.body;
    
    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const leadSource = source || 'unknown';
    const amount = 7999;
    const status = 'initiated';

    await client.connect();
    const result = await client.query(
      `INSERT INTO payment_submissions (full_name, email, phone, amount, status, source)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, full_name, email, phone, amount, status, source, created_at`,
      [fullName, email, phone, amount, status, leadSource]
    );
    await client.end();

    const lead = result.rows[0];

    sendToZohoFlow({
      fullName,
      email,
      phone,
      source: leadSource,
      amount,
      status,
    });

    res.status(200).json({
      id: lead.id,
      fullName: lead.full_name,
      email: lead.email,
      phone: lead.phone,
      amount: lead.amount,
      status: lead.status,
      source: lead.source,
      createdAt: lead.created_at,
    });
  } catch (error) {
    console.error("Lead creation error:", error);
    await client.end().catch(() => {});
    res.status(500).json({ error: "Failed to create lead" });
  }
}
