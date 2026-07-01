import { NextResponse } from 'next/server';
import { data } from '@/lib/db';

/**
 * GET /api/artworks
 * Returns the full list of artworks from the JSON database.
 */
export async function GET() {
  try {
    const artworks = await data.artworks.getAll();
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('[GET /api/artworks]', error);
    return NextResponse.json({ error: 'Failed to load artworks' }, { status: 500 });
  }
}

/**
 * POST /api/artworks
 * Body: Omit<Artwork, 'id' | 'order'>
 * Creates a new artwork entry and persists it.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title?.trim() || !body.category) {
      return NextResponse.json({ error: 'title and category are required' }, { status: 400 });
    }
    const created = await data.artworks.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('[POST /api/artworks]', error);
    return NextResponse.json({ error: 'Failed to create artwork' }, { status: 500 });
  }
}
