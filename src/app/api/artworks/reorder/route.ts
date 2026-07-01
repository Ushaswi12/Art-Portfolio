import { NextResponse } from 'next/server';
import { data } from '@/lib/db';

/**
 * POST /api/artworks/reorder
 * Body: { ids: string[] }
 * Reorders artworks by the supplied ID array and persists the new order.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.ids)) {
      return NextResponse.json({ error: 'ids must be an array of artwork IDs' }, { status: 400 });
    }
    const reordered = await data.artworks.reorder(body.ids);
    return NextResponse.json(reordered);
  } catch (error) {
    console.error('[POST /api/artworks/reorder]', error);
    return NextResponse.json({ error: 'Failed to reorder artworks' }, { status: 500 });
  }
}
