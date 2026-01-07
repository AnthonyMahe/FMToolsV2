const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const outputDir = path.join(__dirname, '..');

// Map language code to country code for flags (hatscripts/circle-flags)
const flags = {
    'bg': 'bg', // Bulgaria
    'cs': 'cz', // Czech - cz
    'da': 'dk', // Denmark - dk
    'de': 'de', // Germany
    'el': 'gr', // Greece - gr
    'en': 'gb', // UK - gb
    'es': 'es', // Spain
    'et': 'ee', // Estonia - ee
    'fi': 'fi', // Finland
    'fr': 'fr', // France
    'ga': 'ie', // Irish - Ireland (ie)
    'hr': 'hr', // Croatia
    'hu': 'hu', // Hungary
    'it': 'it', // Italy
    'lt': 'lt', // Lithuania
    'lv': 'lv', // Latvia
    'mt': 'mt', // Malta
    'nl': 'nl', // Netherlands
    'pl': 'pl', // Poland
    'pt': 'pt', // Portugal
    'ro': 'ro', // Romania
    'sk': 'sk', // Slovakia
    'sl': 'si', // Slovenia - si
    'sv': 'se'  // Sweden - se
};

const languages = {
    'bg': 'Български',
    'cs': 'Čeština',
    'da': 'Dansk',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'en': 'English',
    'es': 'Español',
    'et': 'Eesti',
    'fi': 'Suomi',
    'fr': 'Français',
    'ga': 'Gaeilge',
    'hr': 'Hrvatski',
    'hu': 'Magyar',
    'it': 'Italiano',
    'lt': 'Lietuvių',
    'lv': 'Latviešu',
    'mt': 'Malti',
    'nl': 'Nederlands',
    'pl': 'Polski',
    'pt': 'Português',
    'ro': 'Română',
    'sk': 'Slovenčina',
    'sl': 'Slovenščina',
    'sv': 'Svenska'
};

const files = fs.readdirSync(localesDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;

    const langCode = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf-8'));

    // Header with Logo
    let readmeContent = `<p align="center">\n  <img src="FMToolsV2.png" alt="FMToolsV2" width="128">\n</p>\n\n`;
    readmeContent += `<h1 align="center">${content.app.title}</h1>\n\n`;

    // Language Selector
    readmeContent += `<h4 align="center">📖 Read in your language</h4>\n\n`;
    readmeContent += `<p align="center">\n`;

    Object.keys(flags).forEach(code => {
        const flagUrl = `https://hatscripts.github.io/circle-flags/flags/${flags[code]}.svg`;
        const langName = languages[code];
        const link = code === 'en' ? 'README.md' : `README_${code}.md`;
        readmeContent += `  <a href="${link}"><img src="${flagUrl}" width="32" alt="${langName}"></a>&nbsp;\n`;
    });

    readmeContent += `</p>\n\n---\n\n`;

    // Badges
    readmeContent += `![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)\n`;
    readmeContent += `![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)\n`;
    readmeContent += `![Tauri](https://img.shields.io/badge/Tauri-24C8D8?style=for-the-badge&logo=tauri&logoColor=white)\n`;
    readmeContent += `![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)\n\n`;

    // Description/Body
    readmeContent += `**${content.app.subtitle}**\n\n`;
    readmeContent += `${content.app.welcome}\n\n`;

    readmeContent += `## Description\n${content.app.description}\n\n`;

    readmeContent += `## Features\n`;
    readmeContent += `- **${content.nav.hidden_notes}**: ${content.hidden_notes.description}\n`;
    readmeContent += `- **${content.nav.staff}**: ${content.staff.description}\n`;
    readmeContent += `- **${content.nav.reports}**: ${content.reports.description}\n`;
    readmeContent += `- **${content.nav.infrastructure}**: ${content.infrastructure.description}\n\n`;

    // Installation (Generic/English for now as standard, or localized if strictly needed, but let's keep it simple)
    // We can add a localized "Installation" section if we want, but for now sticking to content structure
    // Let's add a generic localized installation header if possible, or just "Installation"
    readmeContent += `## Installation\n`;
    readmeContent += `1. Download the latest version from [Releases](https://github.com/AnthonyMahe/FMToolsV2/releases)\n`;
    readmeContent += `2. Run the executable (Windows) or AppImage (Linux)\n\n`;

    readmeContent += `## Check my other projects\n`;
    readmeContent += `- [**NewGAN-Manager-26**](https://github.com/AnthonyMahe/NewGAN-Manager-26)\n\n`;

    readmeContent += `## Credits\n${content.footer.based_on}\n`;

    const fileName = langCode === 'en' ? 'README.md' : `README_${langCode}.md`;
    fs.writeFileSync(path.join(outputDir, fileName), readmeContent);
    console.log(`Generated ${fileName}`);
});
