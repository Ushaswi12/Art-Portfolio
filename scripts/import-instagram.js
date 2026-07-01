const fs = require('fs');
const path = require('path');

const CSV_PATH = 'C:\\Users\\chait\\Downloads\\ushaswi-feed\\instagram_complete_map.csv';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'artworks.json');

function parseRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  const headers = parseRow(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseRow(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim(); });
    return obj;
  });
}

function inferCategory(hashtags, caption) {
  const all = (hashtags + ' ' + caption).toLowerCase();
  if (/crochet|thread|knit|yarn|quilling|pipeclean|resin|clay|mould|mold|handmade/.test(all)) return 'DIY Crafts';
  if (/lippan|embroidery/.test(all)) return 'Traditional Art';
  if (/anime|naruto|kakashi|gojo|haikyuu|demon/.test(all)) return 'Fan Art';
  if (/krishna|shiva|hanuman|balaji|venkat|rama|sita|jagannath|parvati/.test(all)) return 'Traditional Art';
  if (/watercolor|watercolour/.test(all)) return 'Paintings';
  if (/oilpast|oilpaint|oil paint|acrylic|canvas/.test(all)) return 'Paintings';
  if (/whitepencil|pencil|sketch|graphite|charcoal|colou?rpencil/.test(all)) return 'Sketches';
  if (/portrait|face/.test(all)) return 'Portraits';
  if (/painting|paint/.test(all)) return 'Paintings';
  if (/drawing|draw/.test(all)) return 'Sketches';
  return 'Paintings';
}

function inferMedium(hashtags, isVideo) {
  if (isVideo === '1') return 'Video Reel';
  const all = hashtags.toLowerCase();
  if (/crochet|yarn|knit/.test(all)) return 'Crochet';
  if (/resin/.test(all)) return 'Resin Art';
  if (/clay/.test(all)) return 'Clay Art';
  if (/quilling/.test(all)) return 'Quilling';
  if (/lippan/.test(all)) return 'Lippan Art';
  if (/oilpast/.test(all)) return 'Oil Pastel';
  if (/oilpaint|oil paint/.test(all)) return 'Oil Paint';
  if (/watercolor|watercolour/.test(all)) return 'Watercolor';
  if (/acrylic/.test(all)) return 'Acrylic';
  if (/whitepencil/.test(all)) return 'White Pencil';
  if (/colou?rpencil/.test(all)) return 'Colour Pencil';
  if (/pencil|graphite|sketch/.test(all)) return 'Pencil';
  return 'Mixed Media';
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
}

const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parseCSV(csvContent).filter(r => r.shortcode);

// Deduplicate by shortcode - prefer _cover images
const seen = new Set();
const unique = rows.filter(row => {
  if (seen.has(row.shortcode)) return false;
  seen.add(row.shortcode);
  return true;
});

console.log('Total rows: ' + rows.length + ', Unique posts: ' + unique.length);

const artworks = unique.map((row, index) => {
  const caption = row.caption_clean || '';
  const hashtags = row.hashtags || '';
  const category = inferCategory(hashtags, caption);
  const medium = inferMedium(hashtags, row.is_video);
  const year = (row.date || '2024').slice(0, 4);

  let title = caption.split(/[.!?\n]/)[0].trim().replace(/[^\x00-\x7F]/g, '').trim();
  if (!title || title.length < 3) title = category + ' by Ushaswi';
  title = title.slice(0, 60).trim();

  const id = slugify(title + '-' + row.shortcode.slice(-6));

  return {
    id,
    shortcode: row.shortcode,
    title,
    category,
    medium,
    year,
    dimensions: row.width + ' x ' + row.height + ' px',
    imageUrl: '/uploads/' + row.shortcode + '.jpg',
    thumbUrl: '/uploads/' + row.shortcode + '.jpg',
    desc: caption || category + ' artwork by Ushaswi Potlapally.',
    artistsNote: caption || '',
    hashtags: hashtags.split(',').map(h => h.trim()).filter(Boolean),
    instagramShortcode: row.shortcode,
    instagramUrl: 'https://www.instagram.com/p/' + row.shortcode + '/',
    likes: parseInt(row.likes) || 0,
    comments: parseInt(row.comments) || 0,
    isVideo: row.is_video === '1',
    date: row.date || '',
    featured: index < 6,
    order: index + 1,
    available: true
  };
});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(artworks, null, 2));
console.log('\nWritten ' + artworks.length + ' artworks to: ' + OUTPUT_PATH);
const counts = {};
artworks.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; });
console.log('\nCategory breakdown:');
Object.entries(counts).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log('  ' + k + ': ' + v));
