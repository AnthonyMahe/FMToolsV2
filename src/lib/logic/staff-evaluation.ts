// Logique de calcul des évaluations pour les préparateurs - FM26
// Dans FM26, les attributs sont des termes descriptifs (pas de chiffres)

export interface StaffAttributes {
    // Entrainement (Coaching)
    fitness: string;
    setPieces: string;
    defending: string;
    mental: string;
    attacking: string;
    tactical: string;
    technical: string;

    // Mental
    motivating: string;
    determination: string;
    discipline: string;

    // Gardiens (Goalkeeping)
    gkShotStopping: string;
    gkHandling: string;
    gkDistribution: string;

    // Connaissances
    tacticalKnowledge: string;
}

// Système FM26 : mots descriptifs avec valeurs correspondantes
export interface FM26Level {
    key: string;
    labelKey: string;
    min: number;
    max: number;
    value: number; // Valeur moyenne pour les calculs
    color: string;
    cssClass: string;
}

export const FM26_LEVELS: FM26Level[] = [
    { key: 'elite', labelKey: 'levels.elite', min: 20, max: 20, value: 20, color: '#22c55e', cssClass: 'level-elite' },
    { key: 'outstanding', labelKey: 'levels.outstanding', min: 18, max: 19, value: 18.5, color: '#4ade80', cssClass: 'level-outstanding' },
    { key: 'very_good', labelKey: 'levels.very_good', min: 15, max: 17, value: 16, color: '#84cc16', cssClass: 'level-very-good' },
    { key: 'good', labelKey: 'levels.good', min: 12, max: 14, value: 13, color: '#eab308', cssClass: 'level-good' },
    { key: 'average', labelKey: 'levels.average', min: 10, max: 11, value: 10.5, color: '#f97316', cssClass: 'level-average' },
    { key: 'competent', labelKey: 'levels.competent', min: 7, max: 9, value: 8, color: '#fb923c', cssClass: 'level-competent' },
    { key: 'reasonable', labelKey: 'levels.reasonable', min: 4, max: 6, value: 5, color: '#ef4444', cssClass: 'level-reasonable' },
    { key: 'unsuited', labelKey: 'levels.unsuited', min: 1, max: 3, value: 2, color: '#dc2626', cssClass: 'level-unsuited' }
];

export const DEFAULT_ATTRIBUTES: StaffAttributes = {
    fitness: 'average',
    setPieces: 'average',
    defending: 'average',
    mental: 'average',
    attacking: 'average',
    tactical: 'average',
    technical: 'average',
    motivating: 'average',
    determination: 'average',
    discipline: 'average',
    gkShotStopping: 'average',
    gkHandling: 'average',
    gkDistribution: 'average',
    tacticalKnowledge: 'average'
};

// Obtenir un niveau FM26 par sa clé
export function getFM26LevelByKey(key: string): FM26Level {
    return FM26_LEVELS.find(l => l.key === key) || FM26_LEVELS[4]; // average par défaut
}

// Convertir une clé en valeur numérique (moyenne)
export function getLevelValue(key: string): number {
    const level = getFM26LevelByKey(key);
    return level.value;
}

// Convertir un nombre en niveau FM26
export function getFM26LevelByValue(value: number): FM26Level {
    for (const level of FM26_LEVELS) {
        if (value >= level.min && value <= level.max) {
            return level;
        }
    }
    return FM26_LEVELS[FM26_LEVELS.length - 1]; // Unsuited par défaut
}

// Formule pour calculer la note globale d'une catégorie
function calculateCategoryScore(primary: string, secondary: string, mental: number): number {
    const primaryValue = getLevelValue(primary);
    const secondaryValue = getLevelValue(secondary);
    const raw = (primaryValue * 3 + secondaryValue * 2 + mental) / 6;
    return Math.round(Math.max(1, Math.min(20, raw)));
}

export interface StaffRatings {
    goalkeeper: { shotStopping: FM26Level; handling: FM26Level };
    defense: { tactical: FM26Level; technical: FM26Level };
    offensive: { tactical: FM26Level; technical: FM26Level };
    possession: { tactical: FM26Level; technical: FM26Level };
    physical: { power: FM26Level; quickness: FM26Level };
    setPieces: FM26Level;
}

export function calculateStaffRatings(attrs: StaffAttributes): StaffRatings {
    const mentalAvg = (getLevelValue(attrs.motivating) + getLevelValue(attrs.determination) + getLevelValue(attrs.discipline)) / 3;

    return {
        goalkeeper: {
            shotStopping: getFM26LevelByValue(calculateCategoryScore(attrs.gkShotStopping, attrs.defending, mentalAvg)),
            handling: getFM26LevelByValue(calculateCategoryScore(attrs.gkHandling, attrs.tactical, mentalAvg))
        },
        defense: {
            tactical: getFM26LevelByValue(calculateCategoryScore(attrs.defending, attrs.tactical, mentalAvg)),
            technical: getFM26LevelByValue(calculateCategoryScore(attrs.defending, attrs.technical, mentalAvg))
        },
        offensive: {
            tactical: getFM26LevelByValue(calculateCategoryScore(attrs.attacking, attrs.tactical, mentalAvg)),
            technical: getFM26LevelByValue(calculateCategoryScore(attrs.attacking, attrs.technical, mentalAvg))
        },
        possession: {
            tactical: getFM26LevelByValue(calculateCategoryScore(attrs.technical, attrs.tactical, mentalAvg)),
            technical: getFM26LevelByValue(calculateCategoryScore(attrs.technical, attrs.attacking, mentalAvg))
        },
        physical: {
            power: getFM26LevelByValue(calculateCategoryScore(attrs.fitness, attrs.mental, mentalAvg)),
            quickness: getFM26LevelByValue(calculateCategoryScore(attrs.fitness, attrs.technical, mentalAvg))
        },
        setPieces: getFM26LevelByValue(calculateCategoryScore(attrs.setPieces, attrs.tactical, mentalAvg))
    };
}

// Catégories d'entrainement avec leurs icônes
export const TRAINING_CATEGORIES = [
    { key: 'goalkeeper', icon: '🧤', subCategories: ['shotStopping', 'handling'] },
    { key: 'defense', icon: '🛡️', subCategories: ['tactical', 'technical'] },
    { key: 'offensive', icon: '⚽', subCategories: ['tactical', 'technical'] },
    { key: 'possession', icon: '🎯', subCategories: ['tactical', 'technical'] },
    { key: 'physical', icon: '💪', subCategories: ['power', 'quickness'] },
    { key: 'setPieces', icon: '🎾', subCategories: null }
] as const;
