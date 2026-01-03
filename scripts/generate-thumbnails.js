import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../public/assets/gallery');
const THUMBS_DIR = path.resolve(__dirname, '../public/assets/gallery/thumbs');
const THUMB_SIZE = 300; // Square thumbnails for uniform grid
const THUMB_QUALITY = 75;

// Ensure thumbs directory exists
if (!fs.existsSync(THUMBS_DIR)) {
    fs.mkdirSync(THUMBS_DIR, { recursive: true });
}

// Get all image files
const files = fs.readdirSync(SOURCE_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.startsWith('.');
});

console.log(`Found ${files.length} images. Generating thumbnails...`);

let processed = 0;
let errors = 0;

// Process images in batches to avoid overwhelming the system
const BATCH_SIZE = 10;

async function processBatch(batch) {
    await Promise.all(batch.map(async (file) => {
        const inputPath = path.join(SOURCE_DIR, file);
        const outputPath = path.join(THUMBS_DIR, file);

        try {
            await sharp(inputPath)
                .rotate() // Auto-orient based on EXIF data
                .resize(THUMB_SIZE, THUMB_SIZE, {
                    withoutEnlargement: true,
                    fit: 'cover', // Crop to square for uniform grid
                    position: 'center'
                })
                .jpeg({ quality: THUMB_QUALITY })
                .toFile(outputPath);

            processed++;
            const stats = fs.statSync(outputPath);
            const originalStats = fs.statSync(inputPath);
            const savings = ((1 - stats.size / originalStats.size) * 100).toFixed(1);

            if (processed % 20 === 0 || processed === files.length) {
                console.log(`[${processed}/${files.length}] ${file} - ${Math.round(stats.size / 1024)}KB (saved ${savings}%)`);
            }
        } catch (error) {
            errors++;
            console.error(`Error processing ${file}:`, error.message);
        }
    }));
}

async function generateAll() {
    const startTime = Date.now();

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        await processBatch(batch);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n=== Thumbnail Generation Complete ===');
    console.log(`Processed: ${processed}/${files.length}`);
    console.log(`Errors: ${errors}`);
    console.log(`Time: ${elapsed}s`);
    console.log(`Thumbnails saved to: ${THUMBS_DIR}`);
}

generateAll().catch(console.error);
