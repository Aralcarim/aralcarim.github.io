const fs = require('fs');
const path = require('path');

const files = [
    'src/locales/it.json',
    'src/locales/de.json'
];

let hasError = false;

files.forEach(f => {
    try {
        const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
        JSON.parse(content);
        console.log(`[PASS] ${f} is valid JSON.`);
    } catch (e) {
        console.error(`[FAIL] ${f} has invalid JSON: ${e.message}`);
        hasError = true;
    }
});

if (hasError) process.exit(1);
