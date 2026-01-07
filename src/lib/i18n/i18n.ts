import { browser } from '$app/environment';
import { init, register, locale, waitLocale } from 'svelte-i18n';

// Liste des 24 langues officielles de l'Union Européenne avec codes ISO pour flag-icons
export const EU_LANGUAGES = [
    { code: 'fr', name: 'Français', flagCode: 'fr' },
    { code: 'en', name: 'English', flagCode: 'gb' },
    { code: 'de', name: 'Deutsch', flagCode: 'de' },
    { code: 'es', name: 'Español', flagCode: 'es' },
    { code: 'it', name: 'Italiano', flagCode: 'it' },
    { code: 'pt', name: 'Português', flagCode: 'pt' },
    { code: 'pl', name: 'Polski', flagCode: 'pl' },
    { code: 'nl', name: 'Nederlands', flagCode: 'nl' },
    { code: 'el', name: 'Ελληνικά', flagCode: 'gr' },
    { code: 'cs', name: 'Čeština', flagCode: 'cz' },
    { code: 'ro', name: 'Română', flagCode: 'ro' },
    { code: 'hu', name: 'Magyar', flagCode: 'hu' },
    { code: 'sv', name: 'Svenska', flagCode: 'se' },
    { code: 'bg', name: 'Български', flagCode: 'bg' },
    { code: 'da', name: 'Dansk', flagCode: 'dk' },
    { code: 'fi', name: 'Suomi', flagCode: 'fi' },
    { code: 'sk', name: 'Slovenčina', flagCode: 'sk' },
    { code: 'hr', name: 'Hrvatski', flagCode: 'hr' },
    { code: 'ga', name: 'Gaeilge', flagCode: 'ie' },
    { code: 'lt', name: 'Lietuvių', flagCode: 'lt' },
    { code: 'sl', name: 'Slovenščina', flagCode: 'si' },
    { code: 'lv', name: 'Latviešu', flagCode: 'lv' },
    { code: 'et', name: 'Eesti', flagCode: 'ee' },
    { code: 'mt', name: 'Malti', flagCode: 'mt' }
] as const;

// Enregistrement des fichiers de traduction
EU_LANGUAGES.forEach(lang => {
    register(lang.code, () => import(`./locales/${lang.code}.json`));
});

// Initialisation
init({
    fallbackLocale: 'fr',
    initialLocale: browser ? window.navigator.language.split('-')[0] : 'fr'
});

export { locale, waitLocale };

// Fonction pour changer de langue
export function setLanguage(langCode: string) {
    locale.set(langCode);
    if (browser) {
        localStorage.setItem('fmtools-lang', langCode);
    }
}

// Fonction pour récupérer la langue sauvegardée
export function getSavedLanguage(): string {
    if (browser) {
        return localStorage.getItem('fmtools-lang') || window.navigator.language.split('-')[0] || 'fr';
    }
    return 'fr';
}

// Fonction pour obtenir le code du drapeau
export function getFlagCode(langCode: string): string {
    const lang = EU_LANGUAGES.find(l => l.code === langCode);
    return lang?.flagCode || 'fr';
}
