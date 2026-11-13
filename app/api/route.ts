import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Sindhu Cement Works API' });
}

