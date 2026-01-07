// Données statiques pour l'outil "Comprendre les Rapports"
// Basé sur les valeurs de Football Manager

export interface ReportEntry {
    textKey: string;
    range: [number, number];
    indicator: 'positive' | 'neutral' | 'negative';
}

export interface ReportCategory {
    key: string;
    entries: ReportEntry[];
}

export const REPORT_CATEGORIES: ReportCategory[] = [
    {
        key: 'adaptability',
        entries: [
            { textKey: 'no_issues', range: [18, 20], indicator: 'positive' },
            { textKey: 'adapt_easily', range: [15, 17], indicator: 'positive' },
            { textKey: 'fairly_well', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'little_problems', range: [7, 9], indicator: 'negative' },
            { textKey: 'problems', range: [4, 6], indicator: 'negative' },
            { textKey: 'difficulties', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'consistency',
        entries: [
            { textKey: 'always_consistent', range: [18, 20], indicator: 'positive' },
            { textKey: 'very_consistent', range: [15, 17], indicator: 'positive' },
            { textKey: 'consistent', range: [12, 14], indicator: 'neutral' },
            { textKey: 'fairly_consistent', range: [10, 11], indicator: 'neutral' },
            { textKey: 'inconsistent', range: [7, 9], indicator: 'negative' },
            { textKey: 'very_inconsistent', range: [4, 6], indicator: 'negative' },
            { textKey: 'terrible_consistency', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'big_matches',
        entries: [
            { textKey: 'big_match_player', range: [18, 20], indicator: 'positive' },
            { textKey: 'rises_occasion', range: [15, 17], indicator: 'positive' },
            { textKey: 'handles_pressure', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'struggles_occasionally', range: [7, 9], indicator: 'negative' },
            { textKey: 'struggles_pressure', range: [4, 6], indicator: 'negative' },
            { textKey: 'cant_handle', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'injury',
        entries: [
            { textKey: 'very_resilient', range: [18, 20], indicator: 'positive' },
            { textKey: 'resilient', range: [15, 17], indicator: 'positive' },
            { textKey: 'fairly_resilient', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'injury_prone', range: [7, 9], indicator: 'negative' },
            { textKey: 'very_injury_prone', range: [4, 6], indicator: 'negative' },
            { textKey: 'extremely_injury_prone', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'dirtiness',
        entries: [
            { textKey: 'extremely_clean', range: [1, 3], indicator: 'positive' },
            { textKey: 'very_clean', range: [4, 6], indicator: 'positive' },
            { textKey: 'clean', range: [7, 9], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'occasionally_dirty', range: [12, 14], indicator: 'negative' },
            { textKey: 'dirty_player', range: [15, 17], indicator: 'negative' },
            { textKey: 'very_dirty', range: [18, 20], indicator: 'negative' }
        ]
    },
    {
        key: 'individual_training',
        entries: [
            { textKey: 'exceptional_improvement', range: [18, 20], indicator: 'positive' },
            { textKey: 'great_improvement', range: [15, 17], indicator: 'positive' },
            { textKey: 'good_improvement', range: [12, 14], indicator: 'positive' },
            { textKey: 'average_improvement', range: [10, 11], indicator: 'neutral' },
            { textKey: 'little_improvement', range: [7, 9], indicator: 'negative' },
            { textKey: 'struggling', range: [4, 6], indicator: 'negative' },
            { textKey: 'no_improvement', range: [1, 3], indicator: 'negative' }
        ]
    }
];
