#!/usr/bin/env node
/**
 * Script: copy-reel-thumbnails.js
 * Reads instagram_complete_map.csv, finds all video posts,
 * and copies their cover JPGs into public/uploads/{shortcode}.jpg
 * Run: node scripts/copy-reel-thumbnails.js
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../../ushaswi-feed/instagram_complete_map.csv');
const DEST_DIR = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(CSV_PATH)) {
  console.error('❌ CSV not found at:', CSV_PATH);
  process.exit(1);
}

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const content = fs.readFileSync(CSV_PATH, 'utf-8');
const lines = content.split('\n');
const headers = lines[0].split(',').map(h => h.trim());

const shortcodeIdx = headers.indexOf('shortcode');
const jpgPathIdx = headers.indexOf('jpg_path');
const isVideoIdx = headers.indexOf('is_video');

console.log(`📋 CSV headers: ${headers.join(', ')}`);
console.log(`📂 Source CSV: ${CSV_PATH}`);
console.log(`📂 Destination: ${DEST_DIR}\n`);

let copied = 0, skipped = 0, missing = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Proper CSV parser supporting quoted fields
  const cols = [];
  let insideQuote = false;
  let current = '';

  for (let ci = 0; ci < line.length; ci++) {
    const char = line[ci];
    if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === ',' && !insideQuote) {
      cols.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  cols.push(current.trim());

  const isVideo = cols[isVideoIdx];
  if (isVideo !== '1') continue;

  const shortcode = cols[shortcodeIdx];
  const srcPath = cols[jpgPathIdx]?.replace(/^"(.*)"$/, '$1');

  if (!shortcode || !srcPath) {
    console.warn(`⚠️  Row ${i}: Missing shortcode or path, skipping`);
    continue;
  }

  const destPath = path.join(DEST_DIR, `${shortcode}.jpg`);

  // Skip if already copied
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  ${shortcode}.jpg already exists, skipping`);
    skipped++;
    continue;
  }

  if (!fs.existsSync(srcPath)) {
    console.warn(`❌ Source not found: ${srcPath}`);
    missing++;
    continue;
  }

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${shortcode}.jpg`);
    copied++;
  } catch (err) {
    console.error(`❌ Failed to copy ${shortcode}: ${err.message}`);
    missing++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Copied: ${copied}`);
console.log(`   ⏭️  Skipped (already exist): ${skipped}`);
console.log(`   ❌ Missing/failed: ${missing}`);
console.log(`\nDone! Thumbnails are in public/uploads/`);
