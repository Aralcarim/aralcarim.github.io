import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite plugin for gallery admin functionality
 * Adds middleware for saving photo category changes to JSON file
 */
export function galleryAdminPlugin() {
    const dataFilePath = path.resolve(__dirname, 'src/data/gallery-photos.json');

    return {
        name: 'gallery-admin',
        configureServer(server) {
            server.middlewares.use('/api/admin/gallery', async (req, res) => {
                // Enable CORS
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                if (req.method === 'OPTIONS') {
                    res.statusCode = 200;
                    res.end();
                    return;
                }

                // GET endpoint - load current photo data
                if (req.method === 'GET' && req.url === '/load') {
                    try {
                        const data = fs.readFileSync(dataFilePath, 'utf-8');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(data);
                    } catch (error) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ error: 'Failed to load gallery data' }));
                    }
                    return;
                }

                // POST endpoint - save photo data
                if (req.method === 'POST' && req.url === '/save') {
                    let body = '';

                    req.on('data', chunk => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);

                            if (!Array.isArray(data.photos)) {
                                throw new Error('Invalid data format');
                            }

                            // Format JSON with 2-space indentation
                            const jsonContent = JSON.stringify(data.photos, null, 2);

                            // Write to file
                            fs.writeFileSync(dataFilePath, jsonContent, 'utf-8');

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, count: data.photos.length }));
                        } catch (error) {
                            console.error('Error saving gallery data:', error);
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ error: error.message }));
                        }
                    });
                    return;
                }

                // 404 for other endpoints
                res.statusCode = 404;
                res.end('Not found');
            });
        }
    };
}
