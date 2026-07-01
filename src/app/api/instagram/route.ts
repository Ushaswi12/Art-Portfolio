import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Instagram access token is not configured' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`,
      { next: { revalidate: 3600 } } // Cache results for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Instagram API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for reels and videos
    const reels = (data.data || [])
      .filter((item: any) => item.media_type === 'VIDEO')
      .map((item: any) => {
        // Try to find a duration string (e.g., "1:30" or "0:45") in the caption, or default
        const durationMatch = item.caption ? item.caption.match(/\b\d+:\d+\b/) : null;
        const duration = durationMatch ? durationMatch[0] : '0:30';

        // Extract title from first line of caption
        const captionLines = item.caption ? item.caption.split('\n') : [];
        const title = captionLines.length > 0 && captionLines[0].trim() 
          ? captionLines[0].substring(0, 40).trim()
          : 'Behind the Scenes Reel';

        // Category mapping based on hashtags in the caption
        let category = 'Process';
        if (item.caption) {
          const lowerCaption = item.caption.toLowerCase();
          if (lowerCaption.includes('technique')) category = 'Technique';
          else if (lowerCaption.includes('craft') || lowerCaption.includes('diy')) category = 'Craft';
          else if (lowerCaption.includes('painting')) category = 'Painting';
          else if (lowerCaption.includes('nature') || lowerCaption.includes('flower')) category = 'Nature';
        }

        return {
          id: item.id,
          title: title,
          description: item.caption || '',
          duration: duration,
          thumbnail: item.thumbnail_url || item.media_url,
          category: category,
          instagramUrl: item.permalink,
        };
      });

    return NextResponse.json(reels);
  } catch (error: any) {
    console.error('Error fetching from Instagram Graph API:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram Reels' }, { status: 500 });
  }
}
