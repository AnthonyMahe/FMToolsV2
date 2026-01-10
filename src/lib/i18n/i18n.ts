import { browser } from '$app/environment';
import { init, register, locale, waitLocale } from 'svelte-i18n';

// Langues officiellement supportées par Football Manager 26
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
    { code: 'sv', name: 'Svenska', flagCode: 'se' },
    { code: 'da', name: 'Dansk', flagCode: 'dk' },
    { code: 'zh', name: '简体中文', flagCode: 'cn' },
    { code: 'ko', name: '한국어', flagCode: 'kr' }
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
