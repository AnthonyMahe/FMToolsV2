// Types et données pour l'outil des notes cachées
// Basé sur les recherches de Kinito et DoctorDim

export interface PersonalityData {
    key: string;
    professionalism: [number, number];
    ambition: [number, number];
    loyalty: [number, number];
    pressure: [number, number];
    sportsmanship: [number, number];
    temperament: [number, number];
    controversy: [number, number];
}

export interface MediaHandlingData {
    key: string;
    temperament: [number, number];
    controversy: [number, number];
}

// Personnalités et leurs attributs cachés associés
// Format: [min, max] pour chaque attribut
export const PERSONALITIES: PersonalityData[] = [
    // Excellentes personnalités
    { key: 'model_citizen', professionalism: [15, 20], ambition: [15, 20], loyalty: [15, 20], pressure: [15, 20], sportsmanship: [15, 20], temperament: [15, 20], controversy: [1, 5] },
    { key: 'professional', professionalism: [15, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'perfectionist', professionalism: [15, 20], ambition: [15, 20], loyalty: [1, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'determined', professionalism: [10, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [15, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'resolute', professionalism: [10, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [15, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'ambitious', professionalism: [10, 20], ambition: [15, 20], loyalty: [1, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'driven', professionalism: [10, 20], ambition: [15, 20], loyalty: [1, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'leader', professionalism: [10, 20], ambition: [15, 20], loyalty: [10, 20], pressure: [15, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'iron_willed', professionalism: [10, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [15, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'spirited', professionalism: [10, 20], ambition: [15, 20], loyalty: [10, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },

    // Bonnes personnalités
    { key: 'devoted', professionalism: [10, 20], ambition: [1, 20], loyalty: [15, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'loyal', professionalism: [10, 20], ambition: [1, 20], loyalty: [15, 20], pressure: [10, 20], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'honest', professionalism: [10, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [10, 20], sportsmanship: [15, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'sporting', professionalism: [10, 20], ambition: [10, 20], loyalty: [10, 20], pressure: [10, 20], sportsmanship: [15, 20], temperament: [10, 20], controversy: [1, 5] },
    { key: 'balanced', professionalism: [10, 14], ambition: [10, 14], loyalty: [10, 14], pressure: [10, 14], sportsmanship: [10, 14], temperament: [10, 14], controversy: [5, 10] },

    // Personnalités moyennes
    { key: 'fairly_professional', professionalism: [10, 14], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 15] },
    { key: 'fairly_determined', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [10, 14], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 15] },
    { key: 'fairly_ambitious', professionalism: [1, 20], ambition: [10, 14], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 15] },
    { key: 'fairly_loyal', professionalism: [1, 20], ambition: [1, 20], loyalty: [10, 14], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 15] },
    { key: 'fairly_sporting', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [10, 14], temperament: [1, 20], controversy: [1, 15] },

    // Personnalités problématiques
    { key: 'casual', professionalism: [1, 9], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'slack', professionalism: [1, 9], ambition: [1, 9], loyalty: [1, 20], pressure: [1, 9], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'temperamental', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 9], temperament: [1, 9], controversy: [10, 20] },
    { key: 'low_determination', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 9], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'mercenary', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 9], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'unsporting', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 9], temperament: [1, 20], controversy: [10, 20] },
    { key: 'unambitious', professionalism: [1, 20], ambition: [1, 9], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'easily_discouraged', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 9], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'spineless', professionalism: [1, 9], ambition: [1, 9], loyalty: [1, 20], pressure: [1, 9], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'light_hearted', professionalism: [1, 9], ambition: [1, 9], loyalty: [1, 20], pressure: [1, 9], sportsmanship: [10, 20], temperament: [10, 20], controversy: [1, 10] },
    { key: 'fickle', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 9], pressure: [1, 20], sportsmanship: [1, 20], temperament: [1, 20], controversy: [1, 20] },
    { key: 'controversial', professionalism: [1, 20], ambition: [1, 20], loyalty: [1, 20], pressure: [1, 20], sportsmanship: [1, 9], temperament: [1, 9], controversy: [15, 20] }
];

// Comportement médiatique et son impact sur les attributs
export const MEDIA_HANDLINGS: MediaHandlingData[] = [
    { key: 'quiet', temperament: [15, 20], controversy: [1, 5] },
    { key: 'reserved', temperament: [12, 18], controversy: [1, 8] },
    { key: 'composed', temperament: [12, 18], controversy: [1, 8] },
    { key: 'balanced', temperament: [10, 14], controversy: [5, 10] },
    { key: 'media_friendly', temperament: [10, 16], controversy: [5, 12] },
    { key: 'outspoken', temperament: [5, 12], controversy: [10, 15] },
    { key: 'evasive', temperament: [8, 14], controversy: [8, 14] },
    { key: 'confrontational', temperament: [1, 9], controversy: [12, 18] },
    { key: 'controversial', temperament: [1, 9], controversy: [15, 20] }
];

export interface HiddenAttributes {
    professionalism: [number, number];
    ambition: [number, number];
    loyalty: [number, number];
    pressure: [number, number];
    sportsmanship: [number, number];
    temperament: [number, number];
    controversy: [number, number];
}

export function calculateHiddenAttributes(
    personalityKey: string | null,
    mediaKey: string | null,
    determination: number
): HiddenAttributes {
    // Valeurs par défaut si aucune sélection
    const defaultRange: [number, number] = [1, 20];

    let result: HiddenAttributes = {
        professionalism: [...defaultRange],
        ambition: [...defaultRange],
        loyalty: [...defaultRange],
        pressure: [...defaultRange],
        sportsmanship: [...defaultRange],
        temperament: [...defaultRange],
        controversy: [...defaultRange]
    };

    // Appliquer les modifications de la personnalité
    if (personalityKey) {
        const personality = PERSONALITIES.find(p => p.key === personalityKey);
        if (personality) {
            result.professionalism = [...personality.professionalism];
            result.ambition = [...personality.ambition];
            result.loyalty = [...personality.loyalty];
            result.pressure = [...personality.pressure];
            result.sportsmanship = [...personality.sportsmanship];
            result.temperament = [...personality.temperament];
            result.controversy = [...personality.controversy];
        }
    }

    // Appliquer les modifications du comportement médiatique
    if (mediaKey) {
        const media = MEDIA_HANDLINGS.find(m => m.key === mediaKey);
        if (media) {
            // Affiner les estimations de tempérament et controverse
            result.temperament = intersectRanges(result.temperament, media.temperament);
            result.controversy = intersectRanges(result.controversy, media.controversy);
        }
    }

    // La détermination affecte l'attribut "pression"
    if (determination >= 1 && determination <= 20) {
        // La détermination haute corrèle avec une bonne gestion de la pression
        if (determination >= 15) {
            result.pressure = intersectRanges(result.pressure, [12, 20]);
        } else if (determination >= 10) {
            result.pressure = intersectRanges(result.pressure, [8, 16]);
        } else {
            result.pressure = intersectRanges(result.pressure, [1, 12]);
        }
    }

    return result;
}

// Intersection de deux plages
function intersectRanges(a: [number, number], b: [number, number]): [number, number] {
    const min = Math.max(a[0], b[0]);
    const max = Math.min(a[1], b[1]);
    if (min > max) return a; // Si pas d'intersection, garder la première
    return [min, max];
}

// Fonction pour obtenir la couleur selon la plage
export function getRangeColor(range: [number, number]): 'success' | 'warning' | 'error' | 'neutral' {
    const avg = (range[0] + range[1]) / 2;
    if (avg >= 15) return 'success';
    if (avg >= 10) return 'neutral';
    if (avg >= 5) return 'warning';
    return 'error';
}
