<script lang="ts">
    import "../app.css";
    import "$lib/i18n/i18n";
    import { waitLocale, _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    let ready = $state(false);

    onMount(async () => {
        await waitLocale();
        ready = true;
    });
</script>

{#if ready}
    <div class="app-container">
        <Navbar />
        <main class="main-content">
            <slot />
        </main>
        <footer class="app-footer">
            <p>
                {$_("footer.copyright")}
                <a
                    href="https://github.com/Gilgiltsu/FMTools"
                    target="_blank"
                    rel="noopener"
                >
                    {$_("footer.based_on")}
                </a>
            </p>
            <a
                href="https://liberapay.com/TonyBoySUPER/donate"
                target="_blank"
                rel="noopener"
                class="donate-button"
            >
                <img
                    alt="Donate using Liberapay"
                    src="https://liberapay.com/assets/widgets/donate.svg"
                />
            </a>
        </footer>
    </div>
{:else}
    <div class="loading-screen">
        <div class="loading-spinner"></div>
    </div>
{/if}

<style>
    .app-footer {
        text-align: center;
        padding: 1.5rem;
        border-top: 1px solid var(--color-border);
        color: var(--color-text-muted);
        font-size: 0.85rem;
    }

    .app-footer a {
        color: var(--color-accent-primary);
        text-decoration: none;
    }

    .app-footer a:hover {
        text-decoration: underline;
    }

    .donate-button {
        display: inline-block;
        margin-top: 0.5rem;
    }

    .donate-button img {
        height: 24px;
        transition: transform 0.2s;
    }

    .donate-button:hover img {
        transform: scale(1.05);
    }

    .loading-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: var(--color-bg-primary);
    }

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-accent-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
