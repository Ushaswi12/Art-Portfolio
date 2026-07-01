const fs = require('fs');
const path = require('path');

const CSV_PATH = 'C:\\Users\\chait\\Downloads\\ushaswi-feed\\instagram_complete_map.csv';
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

function parseRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
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

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const csv = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parseCSV(csv).filter(r => r.shortcode && r.jpg_path);

// Deduplicate by shortcode - first row wins (cover image)
const seen = new Set();
const unique = rows.filter(row => {
  if (seen.has(row.shortcode)) return false;
  seen.add(row.shortcode);
  return true;
});

let copied = 0, skipped = 0, missing = 0;

unique.forEach(row => {
  const src = row.jpg_path;
  const dest = path.join(UPLOADS_DIR, row.shortcode + '.jpg');

  if (fs.existsSync(dest)) { skipped++; return; }
  if (!fs.existsSync(src)) {
    console.log('MISSING: ' + src);
    missing++;
    return;
  }
  fs.copyFileSync(src, dest);
  copied++;
  console.log('Copied: ' + row.shortcode + '.jpg');
});

console.log('\n=== Summary ===');
console.log('Copied:  ' + copied);
console.log('Skipped: ' + skipped + ' (already exist)');
console.log('Missing: ' + missing + ' (source file not found)');
console.log('Output:  ' + UPLOADS_DIR);
