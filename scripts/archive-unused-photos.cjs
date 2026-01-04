const fs = require('fs');
const path = require('path');

// Read existing photos
const photos = require('../src/data/gallery-photos.json');

// Get all files in gallery folder
const galleryFiles = fs.readdirSync('./public/assets/gallery')
  .filter(f => f.endsWith('.jpg'));

// Files already in JSON
const jsonFiles = new Set(photos.map(p => p.src));

// Find missing files (these are the ones to archive)
const unusedFiles = galleryFiles.filter(f => !jsonFiles.has(f));

// Create archive folder
const archiveDir = './public/assets/gallery/Archive';
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Move files to archive
let movedCount = 0;
unusedFiles.forEach(file => {
  const srcPath = path.join('./public/assets/gallery', file);
  const destPath = path.join(archiveDir, file);

  try {
    fs.renameSync(srcPath, destPath);
    movedCount++;
    console.log(`Moved: ${file}`);
  } catch (err) {
    console.error(`Error moving ${file}:`, err.message);
  }
});

console.log(`\nMoved ${movedCount} files to Archive folder`);
