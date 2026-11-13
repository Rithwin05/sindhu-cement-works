import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryByReference } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { reference: string } }
) {
  const { reference } = params;
  if (!reference) {
    return NextResponse.json({ detail: 'Enquiry not found' }, { status: 404 });
  }

  const doc = await getEnquiryByReference(reference);
  if (!doc) {
    return NextResponse.json({ detail: 'Enquiry not found' }, { status: 404 });
  }

  return NextResponse.json(doc);
}

