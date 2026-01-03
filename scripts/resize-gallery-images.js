import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.resolve(__dirname, '../public/assets/gallery');
const MAX_LONGEST_SIDE = 2500; // Maximum dimension (width or height)
const QUALITY = 85;

// Get all image files
const files = fs.readdirSync(GALLERY_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.startsWith('.');
});

console.log(`Found ${files.length} images. Resizing to max ${MAX_LONGEST_SIDE}px on longest side...`);

let processed = 0;
let skipped = 0;
let errors = 0;
let totalOriginalSize = 0;
let totalNewSize = 0;

// Process images in batches
const BATCH_SIZE = 10;

async function processBatch(batch) {
    await Promise.all(batch.map(async (file) => {
        const inputPath = path.join(GALLERY_DIR, file);

        try {
            const metadata = await sharp(inputPath).metadata();
            const { width, height } = metadata;

            // Check if resizing is needed
            const maxDim = Math.max(width, height);
            if (maxDim <= MAX_LONGEST_SIDE) {
                skipped++;
                console.log(`[SKIP] ${file} - Already within limits (${width}x${height})`);
                return;
            }

            // Calculate new dimensions maintaining aspect ratio
            let newWidth, newHeight;
            if (width > height) {
                newWidth = MAX_LONGEST_SIDE;
                newHeight = Math.round(height * (MAX_LONGEST_SIDE / width));
            } else {
                newHeight = MAX_LONGEST_SIDE;
                newWidth = Math.round(width * (MAX_LONGEST_SIDE / height));
            }

            // Get original size
            const originalStats = fs.statSync(inputPath);
            totalOriginalSize += originalStats.size;

            // Resize and overwrite
            await sharp(inputPath)
                .rotate() // Auto-orient based on EXIF data
                .resize(newWidth, newHeight, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ quality: QUALITY })
                .toFile(inputPath + '.tmp');

            // Replace original with resized version
            fs.unlinkSync(inputPath);
            fs.renameSync(inputPath + '.tmp', inputPath);

            // Get new size
            const newStats = fs.statSync(inputPath);
            totalNewSize += newStats.size;
            const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

            processed++;
            console.log(`[${processed}/${files.length}] ${file}: ${width}x${height} → ${newWidth}x${newHeight} (${Math.round(originalStats.size / 1024)}KB → ${Math.round(newStats.size / 1024)}KB, saved ${savings}%)`);

        } catch (error) {
            errors++;
            console.error(`[ERROR] ${file}:`, error.message);
        }
    }));
}

async function resizeAll() {
    const startTime = Date.now();

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        await processBatch(batch);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalSavings = ((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1);

    console.log('\n=== Resize Complete ===');
    console.log(`Processed: ${processed}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log(`Original size: ${Math.round(totalOriginalSize / 1024 / 1024)}MB`);
    console.log(`New size: ${Math.round(totalNewSize / 1024 / 1024)}MB`);
    console.log(`Space saved: ${totalSavings}%`);
    console.log(`Time: ${elapsed}s`);
}

resizeAll().catch(console.error);
