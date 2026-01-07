<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        DEFAULT_ATTRIBUTES,
        calculateStaffRatings,
        FM26_LEVELS,
        getFM26LevelByKey,
        type StaffAttributes,
        type FM26Level,
    } from "$lib/logic/staff-evaluation";

    let attributes = $state<StaffAttributes>({ ...DEFAULT_ATTRIBUTES });

    let ratings = $derived(calculateStaffRatings(attributes));

    function reset() {
        attributes = { ...DEFAULT_ATTRIBUTES };
    }

    function handleSelect(key: keyof StaffAttributes, event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        attributes[key] = value;
    }

    function getLevelBadge(level: FM26Level): string {
        return level.cssClass;
    }

    // Liste des attributs pour les formulaires
    const coachingAttrs: (keyof StaffAttributes)[] = [
        "fitness",
        "setPieces",
        "defending",
        "mental",
        "attacking",
        "tactical",
        "technical",
    ];
    const mentalAttrs: (keyof StaffAttributes)[] = [
        "motivating",
        "determination",
        "discipline",
    ];
    const gkAttrs: (keyof StaffAttributes)[] = [
        "gkShotStopping",
        "gkHandling",
        "gkDistribution",
    ];
    const knowledgeAttrs: (keyof StaffAttributes)[] = ["tacticalKnowledge"];
</script>

<svelte:head>
    <title>{$_("staff.title")} - FMTools</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <div class="header-content">
            <h1 class="page-title">{$_("staff.title")}</h1>
            <p class="page-subtitle">{$_("staff.description")}</p>
        </div>
        <div class="fm26-badge">
            <span class="badge-icon">🎮</span>
            <span>FM26</span>
        </div>
    </header>

    <!-- Légende FM26 -->
    <div class="fm26-legend">
        <h3>{$_("staff.attribute_level")}</h3>
        <div class="legend-items">
            {#each FM26_LEVELS as level}
                <div class="legend-item">
                    <span class="level-badge {level.cssClass}">
                        {$_(level.labelKey)}
                    </span>
                    <span class="legend-range">{level.min}-{level.max}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="staff-grid">
        <!-- Formulaires de saisie avec dropdowns -->
        <div class="input-section">
            <!-- Entrainement -->
            <div class="card">
                <h3 class="card-title">
                    <span class="title-icon">⚽</span>
                    {$_("staff.training")}
                </h3>
                <div class="input-grid">
                    {#each coachingAttrs as attr}
                        <div class="input-row">
                            <label
                                >{$_(
                                    `staff.${attr === "setPieces" ? "set_pieces" : attr === "mental" ? "mental_attr" : attr}`,
                                )}</label
                            >
                            <select
                                value={attributes[attr]}
                                onchange={(e) => handleSelect(attr, e)}
                            >
                                {#each FM26_LEVELS as level}
                                    <option value={level.key}
                                        >{$_(level.labelKey)}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Mental -->
            <div class="card">
                <h3 class="card-title">
                    <span class="title-icon">🧠</span>
                    {$_("staff.mental")}
                </h3>
                <div class="input-grid">
                    {#each mentalAttrs as attr}
                        <div class="input-row">
                            <label>{$_(`staff.${attr}`)}</label>
                            <select
                                value={attributes[attr]}
                                onchange={(e) => handleSelect(attr, e)}
                            >
                                {#each FM26_LEVELS as level}
                                    <option value={level.key}
                                        >{$_(level.labelKey)}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Gardiens -->
            <div class="card">
                <h3 class="card-title">
                    <span class="title-icon">🧤</span>
                    {$_("staff.gk_training")}
                </h3>
                <div class="input-grid">
                    {#each gkAttrs as attr}
                        <div class="input-row">
                            <label
                                >{$_(
                                    `staff.${attr === "gkShotStopping" ? "gk_shot_stopping" : attr === "gkHandling" ? "gk_handling" : "gk_distribution"}`,
                                )}</label
                            >
                            <select
                                value={attributes[attr]}
                                onchange={(e) => handleSelect(attr, e)}
                            >
                                {#each FM26_LEVELS as level}
                                    <option value={level.key}
                                        >{$_(level.labelKey)}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Connaissances -->
            <div class="card">
                <h3 class="card-title">
                    <span class="title-icon">📚</span>
                    {$_("staff.knowledge")}
                </h3>
                <div class="input-grid">
                    {#each knowledgeAttrs as attr}
                        <div class="input-row">
                            <label>{$_("staff.tactical_knowledge")}</label>
                            <select
                                value={attributes[attr]}
                                onchange={(e) => handleSelect(attr, e)}
                            >
                                {#each FM26_LEVELS as level}
                                    <option value={level.key}
                                        >{$_(level.labelKey)}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    {/each}
                </div>
                <button class="btn btn-primary reset-btn" onclick={reset}>
                    <span>🔄</span>
                    {$_("staff.reset")}
                </button>
            </div>
        </div>

        <!-- Tableau des résultats avec système FM26 -->
        <div class="results-section">
            <div class="card results-card">
                <h3 class="results-title">{$_("staff.evaluation")}</h3>
                <table class="table results-table">
                    <thead>
                        <tr>
                            <th colspan="2">{$_("staff.assignment")}</th>
                            <th class="text-center">FM26</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Gardien -->
                        <tr>
                            <td class="cat-icon">🧤</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.goalkeeper")}
                                </div>
                                <div class="sub-name">
                                    {$_("staff.shot_stopping")}
                                </div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.goalkeeper.shotStopping,
                                    )}"
                                >
                                    {$_(
                                        ratings.goalkeeper.shotStopping
                                            .labelKey,
                                    )}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                ><div class="sub-name">
                                    {$_("staff.handling")}
                                </div></td
                            >
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.goalkeeper.handling,
                                    )}"
                                >
                                    {$_(ratings.goalkeeper.handling.labelKey)}
                                </span>
                            </td>
                        </tr>

                        <!-- Défense -->
                        <tr>
                            <td class="cat-icon">🛡️</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.defense")}
                                </div>
                                <div class="sub-name">
                                    {$_("staff.tactical")}
                                </div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.defense.tactical,
                                    )}"
                                >
                                    {$_(ratings.defense.tactical.labelKey)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                ><div class="sub-name">
                                    {$_("staff.technical")}
                                </div></td
                            >
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.defense.technical,
                                    )}"
                                >
                                    {$_(ratings.defense.technical.labelKey)}
                                </span>
                            </td>
                        </tr>

                        <!-- Offensif -->
                        <tr>
                            <td class="cat-icon">⚽</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.offensive")}
                                </div>
                                <div class="sub-name">
                                    {$_("staff.tactical")}
                                </div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.offensive.tactical,
                                    )}"
                                >
                                    {$_(ratings.offensive.tactical.labelKey)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                ><div class="sub-name">
                                    {$_("staff.technical")}
                                </div></td
                            >
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.offensive.technical,
                                    )}"
                                >
                                    {$_(ratings.offensive.technical.labelKey)}
                                </span>
                            </td>
                        </tr>

                        <!-- Possession -->
                        <tr>
                            <td class="cat-icon">🎯</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.possession")}
                                </div>
                                <div class="sub-name">
                                    {$_("staff.tactical")}
                                </div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.possession.tactical,
                                    )}"
                                >
                                    {$_(ratings.possession.tactical.labelKey)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                ><div class="sub-name">
                                    {$_("staff.technical")}
                                </div></td
                            >
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.possession.technical,
                                    )}"
                                >
                                    {$_(ratings.possession.technical.labelKey)}
                                </span>
                            </td>
                        </tr>

                        <!-- Physique -->
                        <tr>
                            <td class="cat-icon">💪</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.physical")}
                                </div>
                                <div class="sub-name">{$_("staff.power")}</div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.physical.power,
                                    )}"
                                >
                                    {$_(ratings.physical.power.labelKey)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                ><div class="sub-name">
                                    {$_("staff.quickness")}
                                </div></td
                            >
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.physical.quickness,
                                    )}"
                                >
                                    {$_(ratings.physical.quickness.labelKey)}
                                </span>
                            </td>
                        </tr>

                        <!-- Coups de pieds arrêtés -->
                        <tr>
                            <td class="cat-icon">🎾</td>
                            <td>
                                <div class="cat-name">
                                    {$_("staff.set_pieces")}
                                </div>
                            </td>
                            <td class="text-center">
                                <span
                                    class="level-badge {getLevelBadge(
                                        ratings.setPieces,
                                    )}"
                                >
                                    {$_(ratings.setPieces.labelKey)}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<style>
    .page-container {
        animation: fadeIn 0.4s ease;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 0.25rem 0;
        background: linear-gradient(135deg, #ff6b00 0%, #ff9a4a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .page-subtitle {
        color: var(--color-text-secondary);
        margin: 0;
    }

    .fm26-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #ff6b00 0%, #ff8c3a 100%);
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
    }

    .fm26-legend {
        margin-bottom: 1.5rem;
        padding: 1rem 1.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 12px;
    }

    .fm26-legend h3 {
        font-size: 0.8rem;
        color: var(--color-text-muted);
        margin: 0 0 0.75rem 0;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .legend-items {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .legend-range {
        font-size: 0.7rem;
        color: var(--color-text-muted);
    }

    .staff-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }

    .input-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input-section .card {
        padding: 1.25rem 1.5rem;
    }

    .card-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-accent-primary);
        margin: 0 0 1rem 0;
    }

    .title-icon {
        font-size: 1.2rem;
    }

    .input-grid {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .input-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .input-row label {
        font-size: 0.85rem;
        color: var(--color-text-secondary);
        flex: 1;
    }

    .input-row select {
        width: 160px;
        padding: 0.5rem 2rem 0.5rem 0.75rem;
        font-size: 0.85rem;
    }

    .reset-btn {
        margin-top: 1.25rem;
        width: 100%;
    }

    .results-section {
        position: sticky;
        top: 80px;
    }

    .results-card {
        padding: 0;
        overflow: hidden;
    }

    .results-title {
        padding: 1rem 1.5rem;
        margin: 0;
        background: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        font-size: 1rem;
        color: var(--color-accent-primary);
    }

    .results-table th {
        background: rgba(107, 74, 158, 0.2);
        padding: 0.85rem 1rem;
        font-size: 0.7rem;
    }

    .results-table td {
        padding: 0.65rem 1rem;
    }

    .cat-icon {
        font-size: 1.4rem;
        width: 45px;
        text-align: center;
    }

    .cat-name {
        font-weight: 600;
        color: var(--color-text-primary);
        font-size: 0.9rem;
    }

    .sub-name {
        font-size: 0.8rem;
        color: var(--color-text-secondary);
    }

    @media (max-width: 900px) {
        .staff-grid {
            grid-template-columns: 1fr;
        }

        .results-section {
            position: static;
        }

        .input-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.35rem;
        }

        .input-row select {
            width: 100%;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
