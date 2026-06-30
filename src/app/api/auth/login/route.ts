import { validateAdminPassword, createSession, destroySession, getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = await validateAdminPassword(password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    await createSession('admin', 'admin');
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}