const fs = require('fs');
const path = require('path');

// Read existing photos
const photos = require('../src/data/gallery-photos.json');

// Get all files in gallery folder
const galleryFiles = fs.readdirSync('./public/assets/gallery')
  .filter(f => f.endsWith('.jpg'));

// Files already in JSON
const jsonFiles = new Set(photos.map(p => p.src));

// Find missing files
const missing = galleryFiles.filter(f => !jsonFiles.has(f));

console.log(`Found ${missing.length} files missing from JSON:`);
missing.forEach(f => console.log(`  - ${f}`));

// Add missing files with 'moments' category
const newEntries = missing.map(f => ({
  src: f,
  category: 'moments'
}));

// Merge and sort chronologically by filename
const allPhotos = [...photos, ...newEntries].sort((a, b) => a.src.localeCompare(b.src));

// Write back to JSON
fs.writeFileSync(
  './src/data/gallery-photos.json',
  JSON.stringify(allPhotos, null, 2)
);

console.log(`\nAdded ${newEntries.length} new entries. Total: ${allPhotos.length}`);
