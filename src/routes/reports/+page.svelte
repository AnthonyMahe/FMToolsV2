<script lang="ts">
    import { _ } from "svelte-i18n";
    import { REPORT_CATEGORIES } from "$lib/logic/reports-data";

    let activeTab = $state("adaptability");

    const tabKeys = REPORT_CATEGORIES.map((c) => c.key);

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
    </div>

    <!-- Contenu de l'onglet actif -->
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
                                {$_(`reports.${activeTab}_${entry.textKey}`, {
                                    default: entry.textKey,
                                })}
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
