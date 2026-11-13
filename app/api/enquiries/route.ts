import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { saveEnquiry } from '@/lib/db';

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

    const product_slug = clean(body.product_slug);
    const product_name = clean(body.product_name);
    const quantity = clean(body.quantity);
    const unit = clean(body.unit) || 'pieces';
    const name = clean(body.name);
    const buyer_type = clean(body.buyer_type);
    const phone = clean(body.phone);
    const city = clean(body.city);
    const consent = Boolean(body.consent);

    if (!product_slug || product_slug.length > 80) {
      return NextResponse.json({ detail: 'Valid product is required' }, { status: 400 });
    }
    if (!product_name || product_name.length > 120) {
      return NextResponse.json({ detail: 'Valid product name is required' }, { status: 400 });
    }
    if (!quantity || quantity.length > 40) {
      return NextResponse.json({ detail: 'Valid quantity is required' }, { status: 400 });
    }
    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ detail: 'Valid full name is required' }, { status: 400 });
    }
    if (!buyer_type || buyer_type.length > 60) {
      return NextResponse.json({ detail: 'Buyer type is required' }, { status: 400 });
    }
    if (!phone || !PHONE_RE.test(phone)) {
      return NextResponse.json({ detail: 'Invalid phone number format' }, { status: 400 });
    }
    if (!city || city.length < 2 || city.length > 80) {
      return NextResponse.json({ detail: 'Project city is required' }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ detail: 'Consent is required' }, { status: 400 });
    }

    const email = clean(body.email);
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ detail: 'Invalid email address' }, { status: 400 });
    }

    const reference = `SCW-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const createdAt = new Date().toISOString();

    const doc = {
      reference,
      product_slug,
      product_name,
      quantity,
      unit,
      length: clean(body.length),
      width: clean(body.width),
      thickness: clean(body.thickness),
      requirements: clean(body.requirements),
      name,
      company: clean(body.company),
      buyer_type,
      phone,
      email: email || null,
      city,
      postcode: clean(body.postcode),
      timeline: clean(body.timeline),
      notes: clean(body.notes),
      consent,
      created_at: createdAt,
    };

    await saveEnquiry(doc);

    return NextResponse.json(
      {
        reference,
        message: 'Enquiry received. Sindhu Cement Works will review your requirement and respond.',
        product: product_name,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ detail: message }, { status: 400 });
  }
}

