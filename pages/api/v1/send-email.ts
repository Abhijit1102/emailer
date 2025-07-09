import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailService } from '@/lib/EmailService';

const emailService = new EmailService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to, subject, body, id } = req.body as {
    to: string;
    subject: string;
    body: string;
    id: string;
  };

  if (!to || !subject || !body || !id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await emailService.sendEmail(to, subject, body, id);
    res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}
