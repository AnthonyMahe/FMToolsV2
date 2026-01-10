<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        REPORT_CATEGORIES,
        TRAINING_EFFECTS,
    } from "$lib/logic/reports-data";

    let activeTab = $state("adaptability");

    // Ajout de l'onglet "hidden_effects" pour les effets sur les notes cachées
    const tabKeys = [...REPORT_CATEGORIES.map((c) => c.key), "hidden_effects"];

    $effect(() => {
        // Ensure activeTab is valid
        if (!tabKeys.includes(activeTab)) {
            activeTab = "adaptability";
        }
    });

    function getActiveCategory() {
        return REPORT_CATEGORIES.find((c) => c.key === activeTab);
    }

    function getIndicatorClass(indicator: string): string {
        switch (indicator) {
            case "positive":
                return "badge-success";
            case "negative":
                return "badge-error";
            default:
                return "badge-neutral";
        }
    }

    function getIndicatorIcon(indicator: string): string {
        switch (indicator) {
            case "positive":
                return "✓";
            case "negative":
                return "✗";
            default:
                return "—";
        }
    }
</script>

<svelte:head>
    <title>{$_("reports.title")} - FMTools</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <h1 class="page-title">{$_("reports.title")}</h1>
        <p class="page-description">{$_("reports.description")}</p>
    </header>

    <!-- Onglets -->
    <div class="tabs">
        {#each REPORT_CATEGORIES as category}
            <button
                class="tab"
                class:active={activeTab === category.key}
                onclick={() => (activeTab = category.key)}
            >
                {$_(`reports.${category.key}`)}
            </button>
        {/each}
        <button
            class="tab tab-special"
            class:active={activeTab === "hidden_effects"}
            onclick={() => (activeTab = "hidden_effects")}
        >
            {$_("reports.hidden_effects")}
        </button>
    </div>

    <!-- Contenu standard des rapports -->
    {#if activeTab !== "hidden_effects"}
        <div class="card">
            {#if getActiveCategory()}
                <table class="table reports-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{$_("reports.report_text")}</th>
                            <th class="text-center">{$_("reports.note")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each getActiveCategory()?.entries || [] as entry}
                            <tr>
                                <td class="indicator-cell">
                                    <span
                                        class="indicator {getIndicatorClass(
                                            entry.indicator,
                                        )}"
                                    >
                                        {getIndicatorIcon(entry.indicator)}
                                    </span>
                                </td>
                                <td class="report-text">
                                    {$_(
                                        `reports.${activeTab}_${entry.textKey}`,
                                        {
                                            default: entry.textKey,
                                        },
                                    )}
                                </td>
                                <td class="text-center">
                                    <span
                                        class="badge {getIndicatorClass(
                                            entry.indicator,
                                        )}"
                                    >
                                        {entry.range[0]} - {entry.range[1]}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    {:else}
        <!-- Section Effets sur les notes cachées -->
        <div class="card hidden-effects-card">
            <p class="effects-intro">
                {$_("reports.hidden_effects_intro")}
            </p>

            <!-- Tableau des effets -->
            <table class="table effects-table">
                <thead>
                    <tr>
                        <th>{$_("reports.message_adjoint")}</th>
                        <th class="text-center">{$_("reports.cause")}</th>
                        <th class="text-center">{$_("reports.consequence")}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Effets positifs -->
                    <tr class="section-header positive">
                        <td colspan="3">{$_("reports.positive_effects")}</td>
                    </tr>
                    {#each TRAINING_EFFECTS.positive as effect}
                        <tr>
                            <td class="message-text">
                                {$_(`reports.${effect.messageKey}`)}
                            </td>
                            <td class="text-center">
                                <span class="cause-badge">
                                    {$_(`reports.${effect.causeKey}`)}
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="consequence-badge positive">
                                    {$_(`reports.${effect.consequenceKey}`)}
                                </span>
                            </td>
                        </tr>
                    {/each}

                    <!-- Effets négatifs -->
                    <tr class="section-header negative">
                        <td colspan="3">{$_("reports.negative_effects")}</td>
                    </tr>
                    {#each TRAINING_EFFECTS.negative as effect}
                        <tr>
                            <td class="message-text">
                                {$_(`reports.${effect.messageKey}`)}
                            </td>
                            <td class="text-center">
                                <span class="cause-badge">
                                    {$_(`reports.${effect.causeKey}`)}
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="consequence-badge negative">
                                    {$_(`reports.${effect.consequenceKey}`)}
                                </span>
                            </td>
                        </tr>
                    {/each}

                    <!-- Aucun effet -->
                    <tr class="section-header neutral">
                        <td colspan="3">{$_("reports.neutral_effects")}</td>
                    </tr>
                    {#each TRAINING_EFFECTS.neutral as effect}
                        <tr>
                            <td class="message-text">
                                {$_(`reports.${effect.messageKey}`)}
                            </td>
                            <td class="text-center">
                                <span class="cause-badge">
                                    {$_(`reports.${effect.causeKey}`)}
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="consequence-badge neutral">
                                    {$_(`reports.${effect.consequenceKey}`)}
                                </span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .page-container {
        animation: fadeIn 0.4s ease;
    }

    .page-header {
        margin-bottom: 1.5rem;
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .page-description {
        color: var(--color-text-secondary);
    }

    .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .tab {
        padding: 0.6rem 1.2rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
    }

    .tab:hover {
        color: var(--color-text-primary);
        border-color: var(--color-accent-primary);
    }

    .tab.active {
        background: rgba(0, 212, 170, 0.15);
        border-color: var(--color-accent-primary);
        color: var(--color-accent-primary);
    }

    .tab-special {
        background: rgba(107, 74, 158, 0.2);
        border-color: var(--color-violet-primary);
    }

    .tab-special:hover,
    .tab-special.active {
        background: rgba(107, 74, 158, 0.3);
        border-color: var(--color-violet-primary);
        color: var(--color-violet-secondary);
    }

    .reports-table {
        width: 100%;
    }

    .indicator-cell {
        width: 50px;
        text-align: center;
    }

    .indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        font-size: 0.9rem;
    }

    .report-text {
        color: var(--color-text-secondary);
        line-height: 1.5;
    }

    .badge {
        padding: 0.3rem 0.75rem;
        font-size: 0.85rem;
        font-weight: 600;
    }

    /* Styles pour les effets sur notes cachées */
    .hidden-effects-card {
        padding: 1.5rem;
    }

    .effects-intro {
        color: var(--color-text-secondary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
        font-size: 0.95rem;
        padding: 1rem;
        background: rgba(107, 74, 158, 0.1);
        border-left: 3px solid var(--color-violet-primary);
        border-radius: 0 8px 8px 0;
    }

    .effects-table {
        width: 100%;
    }

    .effects-table th {
        background: var(--color-bg-secondary);
        padding: 0.85rem 1rem;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .effects-table td {
        padding: 0.75rem 1rem;
        vertical-align: middle;
    }

    .section-header {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }

    .section-header.positive td {
        background: rgba(0, 212, 170, 0.2);
        color: var(--color-success);
        border-left: 3px solid var(--color-success);
    }

    .section-header.negative td {
        background: rgba(239, 68, 68, 0.2);
        color: var(--color-error);
        border-left: 3px solid var(--color-error);
    }

    .section-header.neutral td {
        background: rgba(148, 163, 184, 0.2);
        color: var(--color-text-secondary);
        border-left: 3px solid var(--color-text-muted);
    }

    .message-text {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .cause-badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        font-size: 0.8rem;
        color: var(--color-text-primary);
    }

    .consequence-badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .consequence-badge.positive {
        background: rgba(0, 212, 170, 0.2);
        color: var(--color-success);
        border: 1px solid var(--color-success);
    }

    .consequence-badge.negative {
        background: rgba(239, 68, 68, 0.2);
        color: var(--color-error);
        border: 1px solid var(--color-error);
    }

    .consequence-badge.neutral {
        background: rgba(148, 163, 184, 0.2);
        color: var(--color-text-secondary);
        border: 1px solid var(--color-text-muted);
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

    @media (max-width: 768px) {
        .effects-table {
            font-size: 0.85rem;
        }

        .effects-table td,
        .effects-table th {
            padding: 0.5rem;
        }

        .cause-badge,
        .consequence-badge {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
        }
    }
</style>
