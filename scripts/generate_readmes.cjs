const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const outputDir = path.join(__dirname, '..');

const languages = {
    'bg': '🇧🇬 Български',
    'cs': '🇨🇿 Čeština',
    'da': '🇩🇰 Dansk',
    'de': '🇩🇪 Deutsch',
    'el': '🇬🇷 Ελληνικά',
    'en': '🇬🇧 English',
    'es': '🇪🇸 Español',
    'et': '🇪🇪 Eesti',
    'fi': '🇫🇮 Suomi',
    'fr': '🇫🇷 Français',
    'ga': '🇮🇪 Gaeilge',
    'hr': '🇭🇷 Hrvatski',
    'hu': '🇭🇺 Magyar',
    'it': '🇮🇹 Italiano',
    'lt': '🇱🇹 Lietuvių',
    'lv': '🇱🇻 Latviešu',
    'mt': '🇲🇹 Malti',
    'nl': '🇳🇱 Nederlands',
    'pl': '🇵🇱 Polski',
    'pt': '🇵🇹 Português',
    'ro': '🇷🇴 Română',
    'sk': '🇸🇰 Slovenčina',
    'sl': '🇸🇮 Slovenščina',
    'sv': '🇸🇪 Svenska'
};

const files = fs.readdirSync(localesDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;

    const langCode = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf-8'));

    let readmeContent = `# ${content.app.title}\n\n`;

    // Language Switcher
    readmeContent += 'Check my other repositories : ';
    readmeContent += '[**NewGAN-Manager**](https://github.com/AnthonyMahe/NewGAN-Manager-26)\n\n';

    readmeContent += '### Languages\n';
    Object.keys(languages).forEach(code => {
        if (code === langCode) {
            readmeContent += `**${languages[code]}** | `;
        } else {
            const link = code === 'en' ? 'README.md' : `README_${code}.md`;
            readmeContent += `[${languages[code]}](${link}) | `;
        }
    });
    readmeContent = readmeContent.slice(0, -3) + '\n\n'; // Remove last separator

    // Body
    readmeContent += `> ${content.app.subtitle}\n\n`;
    readmeContent += `${content.app.welcome}\n\n`;

    readmeContent += `## Description\n${content.app.description}\n\n`;

    readmeContent += `## Features\n`;
    readmeContent += `- **${content.nav.hidden_notes}**: ${content.hidden_notes.description}\n`;
    readmeContent += `- **${content.nav.staff}**: ${content.staff.description}\n`;
    readmeContent += `- **${content.nav.reports}**: ${content.reports.description}\n`;
    readmeContent += `- **${content.nav.infrastructure}**: ${content.infrastructure.description}\n\n`;

    readmeContent += `## Credits\n${content.footer.based_on}\n`;

    const fileName = langCode === 'en' ? 'README.md' : `README_${langCode}.md`;
    fs.writeFileSync(path.join(outputDir, fileName), readmeContent);
    console.log(`Generated ${fileName}`);
});
