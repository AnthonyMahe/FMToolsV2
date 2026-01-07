<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        PERSONALITIES,
        MEDIA_HANDLINGS,
        calculateHiddenAttributes,
        getRangeColor,
        type HiddenAttributes,
    } from "$lib/logic/hidden-notes";

    let determination = $state(10);
    let selectedPersonality = $state<string | null>(null);
    let selectedMedia = $state<string | null>(null);

    let attributes = $derived(
        calculateHiddenAttributes(
            selectedPersonality,
            selectedMedia,
            determination,
        ),
    );

    const attributeKeys: (keyof HiddenAttributes)[] = [
        "professionalism",
        "pressure",
        "temperament",
        "ambition",
        "loyalty",
        "sportsmanship",
        "controversy",
    ];

    function getTranslationKey(attr: string): string {
        return `hidden_notes.${attr}`;
    }

    function formatRange(range: [number, number]): string {
        if (range[0] === range[1]) return String(range[0]);
        return `${range[0]} - ${range[1]}`;
    }

    function reset() {
        determination = 10;
        selectedPersonality = null;
        selectedMedia = null;
    }
</script>

<svelte:head>
    <title>{$_("hidden_notes.title")} - FMTools</title>
</svelte:head>

<div class="page-container">
    <header class="page-header">
        <h1 class="page-title">{$_("hidden_notes.title")}</h1>
    </header>

    <div class="content-grid">
        <!-- Formulaire de saisie -->
        <div class="card input-card">
            <div class="form-group">
                <label class="form-label" for="determination">
                    {$_("hidden_notes.determination")}
                </label>
                <input
                    type="number"
                    id="determination"
                    class="form-input"
                    min="1"
                    max="20"
                    bind:value={determination}
                />
            </div>

            <div class="form-group">
                <label class="form-label" for="personality">
                    {$_("hidden_notes.personality")}
                </label>
                <select
                    id="personality"
                    class="form-select"
                    bind:value={selectedPersonality}
                >
                    <option value={null}>{$_("common.select")}</option>
                    {#each PERSONALITIES as p}
                        <option value={p.key}
                            >{$_(`personalities.${p.key}`)}</option
                        >
                    {/each}
                </select>
            </div>

            <div class="form-group">
                <label class="form-label" for="media">
                    {$_("hidden_notes.media_handling")}
                </label>
                <select
                    id="media"
                    class="form-select"
                    bind:value={selectedMedia}
                >
                    <option value={null}>{$_("common.select")}</option>
                    {#each MEDIA_HANDLINGS as m}
                        <option value={m.key}>{$_(`media.${m.key}`)}</option>
                    {/each}
                </select>
            </div>

            <button class="btn btn-secondary" onclick={reset}>
                {$_("common.reset")}
            </button>
        </div>

        <!-- Résultats -->
        <div class="card results-card">
            <h2 class="card-title">{$_("hidden_notes.attributes")}</h2>

            <table class="table attributes-table">
                <thead>
                    <tr>
                        <th>Attribut</th>
                        <th class="text-center">Min</th>
                        <th></th>
                        <th class="text-center">Max</th>
                    </tr>
                </thead>
                <tbody>
                    {#each attributeKeys as attr}
                        {@const range = attributes[attr]}
                        {@const color = getRangeColor(range)}
                        <tr>
                            <td class="attr-name"
                                >{$_(getTranslationKey(attr))}</td
                            >
                            <td class="text-center">
                                <span class="badge badge-{color}"
                                    >{range[0]}</span
                                >
                            </td>
                            <td class="range-bar-cell">
                                <div class="range-bar">
                                    <div
                                        class="range-fill range-{color}"
                                        style="left: {((range[0] - 1) / 19) *
                                            100}%; width: {((range[1] -
                                            range[0]) /
                                            19) *
                                            100}%"
                                    ></div>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="badge badge-{color}"
                                    >{range[1]}</span
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Liens utiles -->
    <div class="links-section">
        <h3>{$_("hidden_notes.learn_more")}</h3>
        <div class="links-grid">
            <a
                href="https://youtu.be/9bWkYexbNII"
                target="_blank"
                rel="noopener"
                class="link-card"
            >
                🎥 {$_("hidden_notes.video_guide")}
            </a>
        </div>
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
        color: var(--color-text-primary);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 2rem;
        align-items: start;
    }

    .input-card {
        position: sticky;
        top: 100px;
    }

    .results-card .card-title {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
    }

    .attributes-table {
        width: 100%;
    }

    .attr-name {
        font-weight: 500;
        color: var(--color-text-secondary);
    }

    .range-bar-cell {
        width: 200px;
        padding: 0.5rem 1rem;
    }

    .range-bar {
        height: 8px;
        background: var(--color-bg-secondary);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
    }

    .range-fill {
        position: absolute;
        top: 0;
        height: 100%;
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .range-success {
        background: var(--color-success);
    }
    .range-warning {
        background: var(--color-warning);
    }
    .range-error {
        background: var(--color-error);
    }
    .range-neutral {
        background: var(--color-accent-secondary);
    }

    .links-section {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-border);
    }

    .links-section h3 {
        font-size: 1rem;
        color: var(--color-text-secondary);
        margin-bottom: 1rem;
    }

    .links-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .link-card {
        padding: 0.75rem 1.25rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-primary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .link-card:hover {
        border-color: var(--color-accent-primary);
        transform: translateY(-2px);
    }

    @media (max-width: 900px) {
        .content-grid {
            grid-template-columns: 1fr;
        }

        .input-card {
            position: static;
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
