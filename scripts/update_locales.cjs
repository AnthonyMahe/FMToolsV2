const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const enParams = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

fs.readdirSync(localesDir).forEach(file => {
    if (file === 'en.json' || file === 'fr.json') return; // Skip 

    const filePath = path.join(localesDir, file);
    try {
        const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let modified = false;

        // Sync footer
        if (!localeData.footer) {
            localeData.footer = enParams.footer;
            modified = true;
        }

        // Sync infrastructure levels
        if (localeData.infrastructure) {
            if (!localeData.infrastructure.levels) {
                localeData.infrastructure.levels = enParams.infrastructure.levels;
                modified = true;
            } else {
                // Deep merge keys
                for (const key in enParams.infrastructure.levels) {
                    if (!localeData.infrastructure.levels[key]) {
                        localeData.infrastructure.levels[key] = enParams.infrastructure.levels[key];
                        modified = true;
                    }
                }
            }
        } else {
            // If infrastructure is missing entirely, copy it
            localeData.infrastructure = enParams.infrastructure;
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(localeData, null, 4));
            console.log(`Updated ${file}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e);
    }
});
