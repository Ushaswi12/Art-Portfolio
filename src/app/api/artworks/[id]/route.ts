import { NextResponse } from 'next/server';
import { data } from '@/lib/db';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/artworks/[id]
 * Body: Partial<Artwork>
 * Updates a single artwork's metadata and persists the change.
 */
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await data.artworks.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error(`[PUT /api/artworks/${id}]`, error);
    return NextResponse.json({ error: 'Failed to update artwork' }, { status: 500 });
  }
}

/**
 * DELETE /api/artworks/[id]
 * Removes an artwork from the JSON database.
 */
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await data.artworks.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[DELETE /api/artworks/${id}]`, error);
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
