import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getLocalReels() {
  try {
    const csvPath = path.join(process.cwd(), '../ushaswi-feed/instagram_complete_map.csv');
    if (!fs.existsSync(csvPath)) {
      return [];
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const shortcodeIdx = headers.indexOf('shortcode');
    const isVideoIdx = headers.indexOf('is_video');
    const captionIdx = headers.indexOf('caption_clean');
    const hashtagsIdx = headers.indexOf('hashtags');

    const reels: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Simple CSV parser for quoted fields
      const cols: string[] = [];
      let insideQuote = false;
      let current = '';

      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        const char = line[charIdx];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          cols.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      cols.push(current);

      if (cols[isVideoIdx] === '1') {
        const shortcode = cols[shortcodeIdx];
        const caption = cols[captionIdx]?.replace(/^"(.*)"$/, '$1') || '';

        // Extract title from first line
        const captionLines = caption.split('\n');
        const title = captionLines.length > 0 && captionLines[0].trim()
          ? captionLines[0].substring(0, 45).trim()
          : 'Behind the Scenes';

        // Check if duration is specified in caption, e.g. "1:30" or default to "0:30"
        const durationMatch = caption.match(/\b\d+:\d+\b/);
        const duration = durationMatch ? durationMatch[0] : '0:30';

        // Category mapping
        let category = 'Process';
        const hashtags = cols[hashtagsIdx] || '';
        const lowerCaption = caption.toLowerCase();
        if (lowerCaption.includes('technique') || hashtags.includes('technique')) category = 'Technique';
        else if (lowerCaption.includes('craft') || lowerCaption.includes('diy') || hashtags.includes('craft')) category = 'Craft';
        else if (lowerCaption.includes('painting') || hashtags.includes('painting')) category = 'Painting';
        else if (lowerCaption.includes('nature') || lowerCaption.includes('flower') || hashtags.includes('flower')) category = 'Nature';

        reels.push({
          id: shortcode,
          title: title,
          description: caption,
          duration: duration,
          thumbnail: `/uploads/${shortcode}.jpg`,
          category: category,
          instagramUrl: `https://www.instagram.com/p/${shortcode}/`,
        });
      }
    }

    return reels;
  } catch (err) {
    console.error('Error loading local reels from CSV:', err);
    return [];
  }
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  // If token is missing, fall back to local scraped Reels automatically
  if (!token) {
    const localReels = getLocalReels();
    return NextResponse.json(localReels);
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
        const durationMatch = item.caption ? item.caption.match(/\b\d+:\d+\b/) : null;
        const duration = durationMatch ? durationMatch[0] : '0:30';

        const captionLines = item.caption ? item.caption.split('\n') : [];
        const title = captionLines.length > 0 && captionLines[0].trim() 
          ? captionLines[0].substring(0, 45).trim()
          : 'Behind the Scenes Reel';

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

    // If live API returned no reels, fall back to local
    if (reels.length === 0) {
      return NextResponse.json(getLocalReels());
    }

    return NextResponse.json(reels);
  } catch (error: any) {
    console.warn('Error fetching from Instagram live API, falling back to local database:', error);
    const localReels = getLocalReels();
    return NextResponse.json(localReels);
  }
}
