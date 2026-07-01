import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');

  if (!urlParam) {
    return NextResponse.json({ error: 'url parameter is required' }, { status: 400 });
  }

  // Extract shortcode
  // Handled formats:
  // https://www.instagram.com/p/DaIRNbihjYZ/ -> DaIRNbihjYZ
  // https://www.instagram.com/reel/DaIRNbihjYZ/ -> DaIRNbihjYZ
  // DaIRNbihjYZ -> DaIRNbihjYZ
  let shortcode = urlParam.trim();
  const match = urlParam.match(/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (match) {
    shortcode = match[1];
  }

  if (!shortcode) {
    return NextResponse.json({ error: 'Could not extract Instagram shortcode' }, { status: 400 });
  }

  // 1. Try local CSV lookup
  try {
    const csvPath = path.join(process.cwd(), '../ushaswi-feed/instagram_complete_map.csv');
    if (fs.existsSync(csvPath)) {
      const content = fs.readFileSync(csvPath, 'utf-8');
      const lines = content.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      const shortcodeIdx = headers.indexOf('shortcode');
      const captionIdx = headers.indexOf('caption_clean');
      const dateIdx = headers.indexOf('date');
      const hashtagsIdx = headers.indexOf('hashtags');

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

        if (cols[shortcodeIdx] === shortcode) {
          const caption = cols[captionIdx]?.replace(/^"(.*)"$/, '$1') || '';
          
          // Formulate title
          const captionLines = caption.split('\n');
          const title = captionLines.length > 0 && captionLines[0].trim()
            ? captionLines[0].substring(0, 45).trim()
            : 'Instagram Artwork';

          // Year
          const dateVal = cols[dateIdx] || '';
          const year = dateVal.split('-')[0] || new Date().getFullYear().toString();

          // Dynamic image resolver: search public/uploads for any file containing the shortcode
          const uploadsDir = path.join(process.cwd(), 'public/uploads');
          let matchedFilename = `${shortcode}.jpg`;
          if (fs.existsSync(uploadsDir)) {
            const files = fs.readdirSync(uploadsDir);
            const foundFile = files.find(f => f.toLowerCase().includes(shortcode.toLowerCase()));
            if (foundFile) {
              matchedFilename = foundFile;
            }
          }

          // Category classification
          let category = 'Paintings';
          const hashtags = cols[hashtagsIdx]?.toLowerCase() || '';
          const lowerCaption = caption.toLowerCase();
          
          if (lowerCaption.includes('watercolor') || hashtags.includes('watercolor')) {
            category = 'Watercolor';
          } else if (lowerCaption.includes('sketch') || hashtags.includes('sketch') || hashtags.includes('portrait')) {
            category = 'Sketches';
          } else if (lowerCaption.includes('macrame') || lowerCaption.includes('knot') || hashtags.includes('macrame')) {
            category = 'DIY Crafts';
          } else if (lowerCaption.includes('sculpt') || lowerCaption.includes('clay') || hashtags.includes('clay')) {
            category = 'Mini Crafts';
          } else if (lowerCaption.includes('ceramic') || lowerCaption.includes('vase') || hashtags.includes('ceramic')) {
            category = 'Handmade Decor';
          } else if (lowerCaption.includes('fanart') || hashtags.includes('fanart') || hashtags.includes('anime')) {
            category = 'Fan Art';
          }

          // Try to guess medium
          let medium = 'Acrylic on Canvas';
          if (category === 'Sketches') medium = 'Graphite on Paper';
          else if (category === 'Watercolor') medium = 'Watercolor on Paper';
          else if (category === 'DIY Crafts') medium = 'Mixed Media / Craft';
          else if (category === 'Mini Crafts') medium = 'Polymer Clay Sculpture';
          else if (category === 'Handmade Decor') medium = 'Stoneware Glazed Ceramics';

          return NextResponse.json({
            title,
            category,
            medium,
            year,
            dimensions: '',
            desc: caption,
            artistsNote: '',
            imageUrl: `/uploads/${matchedFilename}`,
            thumbUrl: `/uploads/${matchedFilename}`,
            instagramUrl: `https://www.instagram.com/p/${shortcode}/`
          });
        }
      }
    }
  } catch (err) {
    console.error('Error in local CSV import lookup:', err);
  }

  // 2. Try live Instagram API lookup
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`
      );
      if (response.ok) {
        const data = await response.json();
        const liveMatch = (data.data || []).find((item: any) => 
          item.permalink?.includes(shortcode) || item.id === shortcode
        );

        if (liveMatch) {
          const caption = liveMatch.caption || '';
          const captionLines = caption.split('\n');
          const title = captionLines.length > 0 && captionLines[0].trim()
            ? captionLines[0].substring(0, 45).trim()
            : 'Instagram Artwork';

          const year = liveMatch.timestamp 
            ? new Date(liveMatch.timestamp).getFullYear().toString()
            : new Date().getFullYear().toString();

          let category = 'Paintings';
          const lowerCaption = caption.toLowerCase();
          if (lowerCaption.includes('watercolor')) category = 'Watercolor';
          else if (lowerCaption.includes('sketch') || lowerCaption.includes('draw')) category = 'Sketches';
          else if (lowerCaption.includes('macrame') || lowerCaption.includes('diy')) category = 'DIY Crafts';
          else if (lowerCaption.includes('sculpt') || lowerCaption.includes('clay')) category = 'Mini Crafts';

          let medium = 'Acrylic on Canvas';
          if (category === 'Sketches') medium = 'Graphite on Paper';
          else if (category === 'Watercolor') medium = 'Watercolor on Paper';
          else if (category === 'DIY Crafts') medium = 'Mixed Media';

          const imageUrl = liveMatch.thumbnail_url || liveMatch.media_url;

          return NextResponse.json({
            title,
            category,
            medium,
            year,
            dimensions: '',
            desc: caption,
            artistsNote: '',
            imageUrl,
            thumbUrl: imageUrl,
            instagramUrl: liveMatch.permalink
          });
        }
      }
    } catch (err) {
      console.error('Error live fetching Instagram post:', err);
    }
  }

  return NextResponse.json({ error: 'Instagram post not found locally or in live feed' }, { status: 404 });
}
