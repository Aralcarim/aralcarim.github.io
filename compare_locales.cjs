const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const itPath = path.join(__dirname, 'src/locales/it.json');
const dePath = path.join(__dirname, 'src/locales/de.json');

function loadJson(p) {
    try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
        console.error(`Failed to load ${p}: ${e.message}`);
        process.exit(1);
    }
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

function compare(sourceData, targetData, langName) {
    console.log(`\n--- Comparing ${langName} vs EN ---`);
    const enKeys = new Set(getAllKeys(sourceData));
    const targetKeys = new Set(getAllKeys(targetData));

    const missingKeys = [...enKeys].filter(k => !targetKeys.has(k));
    const extraKeys = [...targetKeys].filter(k => !enKeys.has(k));

    if (missingKeys.length > 0) {
        console.log(`MISSING keys in ${langName}:`);
        missingKeys.forEach(k => console.log(`  - ${k}`));
    } else {
        console.log(`No missing keys in ${langName}.`);
    }

    if (extraKeys.length > 0) {
        console.log(`EXTRA keys in ${langName} (not in EN):`);
        extraKeys.forEach(k => console.log(`  - ${k}`));
    }

    // Check for identical values (potential untranslated strings), excluding exact matches clearly intended (like numbers or names)
    console.log(`Checking for potentially untranslated strings (value matches EN exactly)...`);
    const potentialUntranslated = [];
    enKeys.forEach(k => {
        if (targetKeys.has(k)) {
            // Helper to get nested value
            const getValue = (obj, path) => path.split('.').reduce((o, i) => o ? o[i] : null, obj);
            const enVal = getValue(sourceData, k);
            const targetVal = getValue(targetData, k);

            // Simple heuristic: if string length > 5 and exactly same, flag it.
            // Excluding common identical words could be refined, but let's see output.
            if (typeof enVal === 'string' && enVal.length > 5 && enVal === targetVal) {
                potentialUntranslated.push({ key: k, value: enVal });
            }
        }
    });

    if (potentialUntranslated.length > 0) {
        console.log(`POTENTIAL UNTRANSLATED strings in ${langName}:`);
        potentialUntranslated.forEach(item => console.log(`  - ${item.key}: "${item.value}"`));
    }
}

const en = loadJson(enPath);
const it = loadJson(itPath);
const de = loadJson(dePath);

compare(en, it, 'IT');
compare(en, de, 'DE');
