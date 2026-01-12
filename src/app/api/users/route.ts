import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Users API endpoint' });
}

export async function POST() {
  return NextResponse.json({ message: 'Users API endpoint' });
}
