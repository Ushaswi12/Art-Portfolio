import { NextResponse } from 'next/server';
import { data } from '@/lib/db';

/**
 * GET /api/content
 * Returns the current page content from the JSON database.
 */
export async function GET() {
  try {
    const content = await data.pageContent.get();
    return NextResponse.json(content);
  } catch (error) {
    console.error('[GET /api/content]', error);
    return NextResponse.json({ error: 'Failed to load page content' }, { status: 500 });
  }
}

/**
 * PUT /api/content
 * Body: Partial<PageContent>
 * Deep-merges the incoming object into the stored page content.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await data.pageContent.update(body);

    // Synchronize biography and statement with artist-info if updated
    if (body.about?.biography || body.about?.statement) {
      const artistUpdates: any = {};
      if (body.about.biography) artistUpdates.bio = body.about.biography;
      if (body.about.statement) artistUpdates.statement = body.about.statement;
      await data.artistInfo.update(artistUpdates);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[PUT /api/content]', error);
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}

/**
 * POST /api/content  (alias for PUT — same behaviour)
 */
export async function POST(request: Request) {
  return PUT(request);
}
