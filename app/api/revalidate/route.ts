import { revalidateBlogs } from '@/actions/revalidateBlogs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await revalidateBlogs();
    return NextResponse.json({ message: 'Cache revalidated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate cache' }, { status: 500 });
  }
}