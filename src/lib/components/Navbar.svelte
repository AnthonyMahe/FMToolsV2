<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        EU_LANGUAGES,
        locale,
        setLanguage,
        getSavedLanguage,
        getFlagCode,
    } from "$lib/i18n/i18n";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import "flag-icons/css/flag-icons.min.css";

    let showLangDropdown = $state(false);
    let currentLang = $state("fr");

    const navItems = [
        { path: "/", icon: "🏠", key: "nav.home" },
        { path: "/hidden-notes", icon: "🔍", key: "nav.hidden_notes" },
        { path: "/staff-evaluation", icon: "⭐", key: "nav.staff" },
        { path: "/reports", icon: "📋", key: "nav.reports" },
        { path: "/infrastructure", icon: "🏟️", key: "nav.infrastructure" },
    ];

    onMount(() => {
        currentLang = getSavedLanguage();
        setLanguage(currentLang);
    });

    function handleLangChange(langCode: string) {
        currentLang = langCode;
        setLanguage(langCode);
        showLangDropdown = false;
    }

    function getCurrentFlagCode() {
        return getFlagCode(currentLang);
    }

    function closeLangDropdown() {
        showLangDropdown = false;
    }
</script>

<svelte:window on:click={closeLangDropdown} />

<nav class="navbar">
    <div class="navbar-container">
        <a href="/" class="navbar-brand">
            <img src="/logo.png" alt="FMToolsV2" class="brand-logo" />
            <span class="brand-text">FMToolsV2</span>
        </a>

        <div class="navbar-nav">
            {#each navItems as item}
                <a
                    href={item.path}
                    class="nav-link"
                    class:active={$page.url.pathname === item.path}
                >
                    <span class="nav-icon">{item.icon}</span>
                    <span class="nav-text">{$_(item.key)}</span>
                </a>
            {/each}
        </div>

        <div class="navbar-actions">
            <div class="lang-selector" onclick={(e) => e.stopPropagation()}>
                <button
                    class="lang-trigger"
                    onclick={() => (showLangDropdown = !showLangDropdown)}
                >
                    <span class="fi fi-{getCurrentFlagCode()}"></span>
                    <span class="lang-code">{currentLang.toUpperCase()}</span>
                    <span class="lang-arrow">▼</span>
                </button>

                {#if showLangDropdown}
                    <div class="lang-dropdown">
                        {#each EU_LANGUAGES as lang}
                            <button
                                class="lang-option"
                                class:selected={currentLang === lang.code}
                                onclick={() => handleLangChange(lang.code)}
                            >
                                <span class="fi fi-{lang.flagCode}"></span>
                                <span>{lang.name}</span>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</nav>

<style>
    .navbar {
        background: linear-gradient(
            180deg,
            rgba(26, 26, 58, 0.98) 0%,
            rgba(15, 15, 36, 0.95) 100%
        );
        border-bottom: 1px solid var(--color-border);
        backdrop-filter: blur(10px);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .navbar-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0.5rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .navbar-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: var(--color-text-primary);
    }

    .brand-logo {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
    }

    .brand-text {
        font-size: 1.25rem;
        font-weight: 700;
        background: linear-gradient(135deg, #ff6b00 0%, #ff9a4a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .navbar-nav {
        display: flex;
        gap: 0.25rem;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: var(--color-text-secondary);
        border-radius: 8px;
        transition: all var(--transition-fast);
        font-size: 0.9rem;
    }

    .nav-link:hover {
        color: var(--color-text-primary);
        background: rgba(255, 107, 0, 0.1);
    }

    .nav-link.active {
        color: var(--color-accent-primary);
        background: rgba(255, 107, 0, 0.15);
    }

    .nav-icon {
        font-size: 1.1rem;
    }

    .navbar-actions {
        display: flex;
        align-items: center;
    }

    .lang-selector {
        position: relative;
    }

    .lang-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text-primary);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .lang-trigger:hover {
        border-color: var(--color-accent-primary);
    }

    .lang-trigger .fi {
        font-size: 1.2rem;
        border-radius: 2px;
    }

    .lang-code {
        font-size: 0.8rem;
        font-weight: 500;
    }

    .lang-arrow {
        font-size: 0.6rem;
        opacity: 0.6;
    }

    .lang-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        box-shadow: var(--shadow-card);
        max-height: 350px;
        overflow-y: auto;
        min-width: 200px;
        z-index: 1000;
    }

    .lang-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.6rem 1rem;
        background: none;
        border: none;
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
        text-align: left;
        font-size: 0.9rem;
    }

    .lang-option .fi {
        font-size: 1.2rem;
        border-radius: 2px;
    }

    .lang-option:hover {
        background: rgba(255, 107, 0, 0.1);
        color: var(--color-text-primary);
    }

    .lang-option.selected {
        background: rgba(255, 107, 0, 0.15);
        color: var(--color-accent-primary);
    }

    @media (max-width: 768px) {
        .navbar-container {
            padding: 0.5rem 1rem;
            flex-wrap: wrap;
        }

        .navbar-nav {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 0.5rem;
            flex-wrap: wrap;
        }

        .nav-text {
            display: none;
        }

        .nav-link {
            padding: 0.5rem 0.75rem;
        }
    }
</style>
