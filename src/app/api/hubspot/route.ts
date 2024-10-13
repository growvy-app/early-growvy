import { NextResponse } from 'next/server';
import { createOrUpdateContact } from '@/lib/hubspot';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    const result = await createOrUpdateContact(email, name);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error creating or updating HubSpot contact' }, { status: 500 });
  }
}
