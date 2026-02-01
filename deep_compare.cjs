const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const itPath = path.join(__dirname, 'src/locales/it.json');
const dePath = path.join(__dirname, 'src/locales/de.json');

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

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

console.log("SUSPICIOUS ITEMS REPORT");
console.log("=======================");

allKeys.forEach(k => {
    const valEn = getValue(en, k);
    const valIt = getValue(it, k);
    const valDe = getValue(de, k);

    if (typeof valEn !== 'string') return; // Skip non-strings

    check("IT", k, valEn, valIt);
    check("DE", k, valEn, valDe);
});

function check(lang, key, source, target) {
    if (!target) {
        console.log(`[${lang}] MISSING: ${key}`);
        return;
    }

    // 1. Length Check
    const ratio = target.length / source.length;
    if (source.length > 20 && (ratio < 0.6 || ratio > 1.6)) {
        console.log(`[${lang}] LENGTH WARNING (${Math.round(ratio * 100)}%): ${key}`);
        console.log(`   EN: ${source.substring(0, 50)}...`);
        console.log(`   ${lang}: ${target.substring(0, 50)}...`);
    }

    // 2. Number Check
    const extractNums = (s) => (s.match(/\d+/g) || []).sort().join(',');
    if (extractNums(source) !== extractNums(target)) {
        console.log(`[${lang}] NUMBER MISMATCH: ${key}`);
        console.log(`   EN: ${extractNums(source)} in "${source.substring(0, 30)}..."`);
        console.log(`   ${lang}: ${extractNums(target)} in "${target.substring(0, 30)}..."`);
    }

    // 3. Proper Noun Check (Heuristic: Capitalized words in middle of sentence)
    // This is noisy, so let's stick to key nouns we know are important
    const criticalWords = ["Google", "Espresso", "Cornetto", "Primitivo", "Negroamaro", "Apricena", "35", "19:30"];
    criticalWords.forEach(word => {
        if (source.includes(word) && !target.includes(word)) {
            console.log(`[${lang}] MISSING KEYWORD '${word}': ${key}`);
        }
    });

    // 4. Punctuation Check (Question marks)
    if (source.includes('?') && !target.includes('?')) {
        console.log(`[${lang}] MISSING QUESTION MARK: ${key}`);
    }
}
