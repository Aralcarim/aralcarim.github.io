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

const en = loadJson(enPath);
const it = loadJson(itPath);
const de = loadJson(dePath);

const allKeys = getAllKeys(en);

console.log("KEY | ENGLISH | ITALIAN | GERMAN");
console.log("-".repeat(100));

function getValue(obj, path) {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

allKeys.forEach(key => {
    const valEn = JSON.stringify(getValue(en, key));
    const valIt = JSON.stringify(getValue(it, key));
    const valDe = JSON.stringify(getValue(de, key));

    console.log(`KEY: ${key}`);
    console.log(`EN: ${valEn}`);
    console.log(`IT: ${valIt}`);
    console.log(`DE: ${valDe}`);
    console.log(""); // Empty line for readability
});
