const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

function deepMerge(target, source) {
    let modified = false;
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) {
                target[key] = {};
                modified = true;
            }
            if (deepMerge(target[key], source[key])) {
                modified = true;
            }
        } else {
            if (target[key] === undefined) {
                target[key] = source[key]; // Fill missing key with source value
                modified = true;
            }
        }
    }
    return modified;
}

fs.readdirSync(localesDir).forEach(file => {
    if (file === 'en.json' || file === 'fr.json') return;

    const filePath = path.join(localesDir, file);
    try {
        const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (deepMerge(localeData, enData)) {
            fs.writeFileSync(filePath, JSON.stringify(localeData, null, 4));
            console.log(`Updated ${file} with missing keys`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
});
