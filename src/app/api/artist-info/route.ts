import { NextResponse } from 'next/server';
import { data } from '@/lib/db';

/**
 * GET /api/artist-info
 * Returns the current artist info from the JSON database.
 */
export async function GET() {
  try {
    const info = await data.artistInfo.get();
    return NextResponse.json(info);
  } catch (error) {
    console.error('[GET /api/artist-info]', error);
    return NextResponse.json({ error: 'Failed to load artist info' }, { status: 500 });
  }
}

/**
 * PUT /api/artist-info
 * Body: Partial<ArtistInfo>
 * Updates and persists artist metadata.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await data.artistInfo.update(body);

    // Synchronize bio and statement with pageContent if updated
    if (body.bio || body.statement) {
      const contentUpdates: any = { about: {} };
      if (body.bio) contentUpdates.about.biography = body.bio;
      if (body.statement) contentUpdates.about.statement = body.statement;
      await data.pageContent.update(contentUpdates);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/artist-info]', error);
    return NextResponse.json({ error: 'Failed to update artist info' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
