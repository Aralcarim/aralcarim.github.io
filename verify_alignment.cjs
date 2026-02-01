const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const itPath = path.join(__dirname, 'src/locales/it.json');
const dePath = path.join(__dirname, 'src/locales/de.json');

function loadJson(p) {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function getAllKeys(obj, prefix = '') {
    let keys = [];
    for (const k in obj) {
        const newKey = prefix ? `${prefix}.${k}` : k;
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            keys = keys.concat(getAllKeys(obj[k], newKey));
        } else {
            keys.push(newKey);
        }
    }
    return keys;
}

function getValue(obj, path) {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

const en = loadJson(enPath);
const it = loadJson(itPath);
const de = loadJson(dePath);
const allKeys = getAllKeys(en);

allKeys.forEach(k => {
    const valEn = getValue(en, k);
    const valIt = getValue(it, k);
    const valDe = getValue(de, k);

    console.log(`[${k}]`);
    console.log(`  EN: ${JSON.stringify(valEn)}`);
    console.log(`  IT: ${JSON.stringify(valIt)}`);
    console.log(`  DE: ${JSON.stringify(valDe)}`);
    console.log("");
});
