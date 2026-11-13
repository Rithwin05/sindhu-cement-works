import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { saveContactMessage } from '@/lib/db';

const PHONE_RE = /^\+?[0-9\s\-()]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown): string | null {
  if (typeof v === 'string') {
    const trimmed = v.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = clean(body.name);
    const phone = clean(body.phone);
    const message = clean(body.message);

    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ detail: 'Valid full name is required' }, { status: 400 });
    }
    if (!phone || !PHONE_RE.test(phone)) {
      return NextResponse.json({ detail: 'Invalid phone number format' }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 2000) {
      return NextResponse.json({ detail: 'Message must be between 10 and 2000 characters' }, { status: 400 });
    }

    const email = clean(body.email);
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ detail: 'Invalid email address' }, { status: 400 });
    }

    const reference = `MSG-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const createdAt = new Date().toISOString();

    const doc = {
      reference,
      name,
      phone,
      email: email || null,
      subject: clean(body.subject),
      message,
      created_at: createdAt,
    };

    await saveContactMessage(doc);

    return NextResponse.json(
      {
        reference,
        message: 'Message received. The team at Sindhu Cement Works will get back to you.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ detail: msg }, { status: 400 });
  }
}

