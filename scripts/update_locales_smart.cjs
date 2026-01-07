const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const enParams = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// Mapping strategy: Infrastructure Key -> List of existing keys to try in order
const mapping = {
    "state_of_the_art": ["levels.elite", "levels.outstanding"],
    "superb": ["levels.outstanding", "levels.elite"],
    "legendary": ["levels.elite"],
    "exceptional": ["levels.outstanding", "levels.elite"],
    "excellent": ["levels.outstanding", "levels.very_good"],
    "very_good": ["levels.very_good"],
    "good": ["levels.good"],
    "above_average": ["levels.good", "levels.average"],
    "average": ["levels.average"],
    "adequate": ["levels.competent", "levels.average"],
    "competent": ["levels.competent"],
    "below_average": ["levels.reasonable", "levels.unsuited"],
    "basic": ["levels.reasonable"],
    "developmental": ["levels.reasonable"],
    "weak": ["levels.unsuited"],
    "mediocre": ["levels.unsuited"],
    "poor": ["levels.unsuited"],
    "very_poor": ["levels.unsuited"],
    "very_weak": ["levels.unsuited"],
    "non_existent": ["levels.unsuited"]
};

function resolveTranslation(localeData, key) {
    if (mapping[key]) {
        for (const candidate of mapping[key]) {
            // Traverse dot notation
            const parts = candidate.split('.');
            let val = localeData;
            for (const p of parts) {
                val = val && val[p];
            }
            if (val) return val;
        }
    }
    return null; // Fallback to EN if nothing found
}

fs.readdirSync(localesDir).forEach(file => {
    if (file === 'en.json' || file === 'fr.json') return;

    const filePath = path.join(localesDir, file);
    try {
        const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let modified = false;

        // Sync footer (Always copy EN if missing, hard to translate automatically)
        if (!localeData.footer) {
            localeData.footer = enParams.footer;
            // Best effort for "Based on": keep EN or empty
            modified = true;
        }

        // Sync infrastructure levels using intelligent mapping
        if (!localeData.infrastructure) localeData.infrastructure = {};
        if (!localeData.infrastructure.levels) localeData.infrastructure.levels = {};

        for (const key in enParams.infrastructure.levels) {
            // Only update if missing or if it looks like English copy (optional check)
            // But here we want to overwrite the previous English copy I made!
            // I'll overwrite if the current value equals the English value
            const currentValue = localeData.infrastructure.levels[key];
            const enValue = enParams.infrastructure.levels[key];

            // If missing OR is english (failed previous script), try to improve
            if (!currentValue || currentValue === enValue) {
                const betterTrans = resolveTranslation(localeData, key);
                if (betterTrans && betterTrans !== currentValue) {
                    localeData.infrastructure.levels[key] = betterTrans;
                    modified = true;
                } else if (!currentValue) {
                    // Fallback EN
                    localeData.infrastructure.levels[key] = enValue;
                    modified = true;
                }
            }
        }

        // Also ensure title/desc exist
        if (!localeData.infrastructure.title) {
            localeData.infrastructure.title = enParams.infrastructure.title; // Keep EN fallback for titles
            localeData.infrastructure.description = enParams.infrastructure.description;
            // Here we could try to map title but it's specific.
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(localeData, null, 4));
            console.log(`Updated ${file} with intelligent mapping`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
});
