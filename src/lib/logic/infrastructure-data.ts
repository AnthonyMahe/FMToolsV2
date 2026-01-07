export interface InfrastructureLevel {
    key: string;
    range: [number, number];
}

export interface InfrastructureCategory {
    key: string;
    icon: string;
    levels: InfrastructureLevel[];
}

export const INFRASTRUCTURE_CATEGORIES: InfrastructureCategory[] = [
    {
        key: 'training_center',
        icon: '🏋️',
        levels: [
            { key: 'state_of_the_art', range: [20, 20] },
            { key: 'superb', range: [18, 19] },
            { key: 'excellent', range: [16, 17] },
            { key: 'very_good', range: [14, 15] },
            { key: 'good', range: [12, 13] },
            { key: 'average', range: [10, 11] }, // FM usage varies, but assuming 'Adequate' or 'Average' around 10-11
            { key: 'adequate', range: [8, 9] },  // Need to verify mappings. Let's use generic keys matching the French terms approximately.
            // FR: Correct (10-11), Moyen (8-9). Let's use keys: adequate, average. Or better:
            // 20: ultramoderne -> state_of_the_art
            // 18-19: superbe -> superb
            // 16-17: excellent -> excellent
            // 14-15: très bon -> very_good
            // 12-13: bon -> good
            // 10-11: correct -> adequate
            // 8-9: moyen -> average
            // 6-7: basique -> basic
            // 4-5: médiocre -> below_average
            // 2-3: mauvais -> poor
            // 1: très mauvais -> very_poor 
            // Wait, I should stick to what was there or standardized keys.
            // Let's use keys that describe the English equivalent for easier translation later.
            // Old FR: Correct -> Adequate ? Moyen -> Average.
            { key: 'adequate', range: [10, 11] }, // Correct
            { key: 'average', range: [8, 9] },    // Moyen
            { key: 'basic', range: [6, 7] },
            { key: 'mediocre', range: [4, 5] },
            { key: 'poor', range: [2, 3] },
            { key: 'very_poor', range: [1, 1] }
        ]
    },
    {
        key: 'facilities',
        icon: '🏟️',
        levels: [
            { key: 'state_of_the_art', range: [20, 20] },
            { key: 'superb', range: [18, 19] },
            { key: 'excellent', range: [16, 17] },
            { key: 'very_good', range: [14, 15] },
            { key: 'good', range: [12, 13] },
            { key: 'adequate', range: [10, 11] },
            { key: 'average', range: [8, 9] },
            { key: 'basic', range: [6, 7] },
            { key: 'mediocre', range: [4, 5] },
            { key: 'poor', range: [2, 3] },
            { key: 'very_poor', range: [1, 1] }
        ]
    },
    {
        key: 'coaching',
        icon: '📋',
        levels: [
            { key: 'legendary', range: [20, 20] },
            { key: 'exceptional', range: [18, 19] },
            { key: 'excellent', range: [16, 17] },
            { key: 'very_good', range: [14, 15] },
            { key: 'good', range: [12, 13] },
            { key: 'adequate', range: [10, 11] },
            { key: 'average', range: [8, 9] },
            { key: 'developmental', range: [6, 7] }, // En développement
            { key: 'weak', range: [4, 5] },
            { key: 'very_weak', range: [2, 3] },
            { key: 'non_existent', range: [1, 1] }
        ]
    },
    {
        key: 'youth_recruitment',
        icon: '🌱',
        levels: [
            { key: 'exceptional', range: [20, 20] },
            { key: 'excellent', range: [18, 19] },
            { key: 'very_good', range: [16, 17] },
            { key: 'good', range: [14, 15] },
            { key: 'above_average', range: [12, 13] },
            { key: 'average', range: [10, 11] },
            { key: 'below_average', range: [8, 9] }, // En dessous de la moyenne
            { key: 'weak', range: [6, 7] }, // Faible used here (was Faible for 6-7 in old?) Old: Faible (6-7), Très faible (4-5), Mauvais (2-3), Inexistant (1)
            // Wait, previous file line 78: Faible range 6-7.
            { key: 'weak', range: [6, 7] },
            { key: 'very_weak', range: [4, 5] }, // Très faible (matches old 4-5) - wait old was Très faible 4-5? Old line 79 "Très faible" [4,5].
            { key: 'poor', range: [2, 3] }, // Mauvais
            { key: 'non_existent', range: [1, 1] } // Inexistant
        ]
    }
];
