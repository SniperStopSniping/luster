import { NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/site';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LUSTER_EMAIL_FROM;
  if (!apiKey || !from) return NextResponse.json({ sent: false, error: 'Email delivery is not configured yet.' }, { status: 503 });
  try {
    const body = await request.json() as { kind?: string; data?: Record<string, unknown> };
    if (!body.data || !body.kind) return NextResponse.json({ sent: false, error: 'Please complete the form.' }, { status: 400 });
    const lines = Object.entries(body.data).map(([key, value]) => `${key}: ${String(value)}`).join('\n');
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [CONTACT_EMAIL], reply_to: typeof body.data.email === 'string' ? body.data.email : undefined, subject: `Luster Studio ${body.kind === 'join' ? 'introduction' : 'wholesale inquiry'}`, text: lines }) });
    if (!response.ok) return NextResponse.json({ sent: false, error: 'The email provider could not confirm delivery.' }, { status: 502 });
    return NextResponse.json({ sent: true });
  } catch { return NextResponse.json({ sent: false, error: 'The message could not be sent. Please try again.' }, { status: 500 }); }
}
