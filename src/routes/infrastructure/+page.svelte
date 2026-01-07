<script lang="ts">
    import { _ } from "svelte-i18n";
    import { INFRASTRUCTURE_CATEGORIES } from "$lib/logic/infrastructure-data";
</script>

<svelte:head>
    <title>{$_("infrastructure.title")} - FMTools</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <h1 class="page-title">{$_("infrastructure.title")}</h1>
        <p class="page-description">{$_("infrastructure.description")}</p>
    </header>

    <div class="infra-grid">
        {#each INFRASTRUCTURE_CATEGORIES as category}
            <div class="card infra-card">
                <div class="card-header">
                    <span class="cat-icon">{category.icon}</span>
                    <h2 class="cat-title">
                        {$_(`infrastructure.${category.key}`)}
                    </h2>
                </div>

                <table class="table infra-table">
                    <thead>
                        <tr>
                            <th>{$_("infrastructure.level")}</th>
                            <th class="text-right"
                                >{$_("infrastructure.value")}</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each category.levels as level, i}
                            {@const isTop = i < 3}
                            {@const isMid = i >= 3 && i < 7}
                            <tr class:top-tier={isTop} class:mid-tier={isMid}>
                                <td class="level-name"
                                    >{$_(
                                        `infrastructure.levels.${level.key}`,
                                    )}</td
                                >
                                <td class="text-right">
                                    <span
                                        class="value-badge"
                                        class:top={isTop}
                                        class:mid={isMid}
                                    >
                                        {level.range[0]}{level.range[0] !==
                                        level.range[1]
                                            ? ` - ${level.range[1]}`
                                            : ""}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/each}
    </div>
</div>

<style>
    .page-container {
        animation: fadeIn 0.4s ease;
    }

    .page-header {
        margin-bottom: 2rem;
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .page-description {
        color: var(--color-text-secondary);
    }

    .infra-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .infra-card {
        padding: 0;
        overflow: hidden;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        background: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
    }

    .cat-icon {
        font-size: 1.5rem;
    }

    .cat-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-primary);
    }

    .infra-table {
        width: 100%;
    }

    .infra-table th {
        padding: 0.6rem 1rem;
        font-size: 0.75rem;
    }

    .infra-table td {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
    }

    .level-name {
        color: var(--color-text-secondary);
    }

    .top-tier .level-name {
        color: var(--color-success);
        font-weight: 500;
    }

    .mid-tier .level-name {
        color: var(--color-text-primary);
    }

    .value-badge {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        background: rgba(168, 197, 224, 0.1);
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-text-secondary);
    }

    .value-badge.top {
        background: rgba(74, 222, 128, 0.15);
        color: var(--color-success);
    }

    .value-badge.mid {
        background: rgba(0, 153, 204, 0.15);
        color: var(--color-accent-secondary);
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
