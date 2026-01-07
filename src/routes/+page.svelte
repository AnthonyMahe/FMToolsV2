<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>{$_("app.title")} - {$_("app.subtitle")}</title>
</svelte:head>

<div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
        <h1 class="hero-title">{$_("app.welcome")}</h1>
        <p class="hero-description">{$_("app.description")}</p>
        <p class="hero-intro">{$_("app.tools_intro")}</p>
    </section>

    <!-- Tools Grid -->
    <section class="tools-section">
        <div class="tools-grid">
            <!-- Outil 1: Notes Cachées -->
            <a href="/hidden-notes" class="tool-card">
                <div class="tool-icon">🔍</div>
                <div class="tool-content">
                    <h2 class="tool-title">{$_("hidden_notes.title")}</h2>
                    <p class="tool-description">
                        {$_("hidden_notes.description")}
                    </p>
                    <ul class="tool-features">
                        <li>{$_("hidden_notes.personality")}</li>
                        <li>{$_("hidden_notes.media_handling")}</li>
                        <li>{$_("hidden_notes.determination")}</li>
                    </ul>
                </div>
                <span class="tool-arrow">→</span>
            </a>

            <!-- Outil 2: Préparateurs -->
            <a href="/staff-evaluation" class="tool-card">
                <div class="tool-icon">⭐</div>
                <div class="tool-content">
                    <h2 class="tool-title">{$_("staff.title")}</h2>
                    <p class="tool-description">{$_("staff.description")}</p>
                </div>
                <span class="tool-arrow">→</span>
            </a>

            <!-- Outil 3: Rapports -->
            <a href="/reports" class="tool-card">
                <div class="tool-icon">📋</div>
                <div class="tool-content">
                    <h2 class="tool-title">{$_("reports.title")}</h2>
                    <p class="tool-description">{$_("reports.description")}</p>
                </div>
                <span class="tool-arrow">→</span>
            </a>

            <!-- Outil 4: Infrastructures -->
            <a href="/infrastructure" class="tool-card">
                <div class="tool-icon">🏟️</div>
                <div class="tool-content">
                    <h2 class="tool-title">{$_("infrastructure.title")}</h2>
                    <p class="tool-description">
                        {$_("infrastructure.description")}
                    </p>
                </div>
                <span class="tool-arrow">→</span>
            </a>
        </div>
    </section>

    <!-- Credits Section -->
    <section class="credits-section">
        <div class="credits-card">
            <p class="credits-based">{$_("app.based_on")}</p>
            <h3>📺 {$_("app.tutorial")}</h3>
            <a
                href="https://youtu.be/9bWkYexbNII"
                target="_blank"
                rel="noopener"
                class="video-link"
            >
                {$_("app.video_presentation")}
            </a>
            <div class="credits-links">
                <a
                    href="https://www.youtube.com/@Kiniitooo"
                    target="_blank"
                    rel="noopener"
                    class="social-link youtube"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                    >
                        <path
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                        />
                    </svg>
                    Kiniitooo
                </a>
                <a
                    href="https://www.twitch.tv/kiniitooo"
                    target="_blank"
                    rel="noopener"
                    class="social-link twitch"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                    >
                        <path
                            d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                        />
                    </svg>
                    Kiniitooo
                </a>
            </div>
        </div>
    </section>
</div>

<style>
    .home-container {
        animation: fadeIn 0.5s ease;
    }

    .hero {
        text-align: center;
        padding: 2rem 0 3rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .hero-title {
        font-size: 2rem;
        font-weight: 700;
        background: var(--color-accent-gradient);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1.5rem;
        line-height: 1.3;
    }

    .hero-description {
        color: var(--color-text-secondary);
        font-size: 1rem;
        line-height: 1.7;
        margin-bottom: 1rem;
    }

    .hero-intro {
        color: var(--color-text-primary);
        font-weight: 500;
    }

    .tools-section {
        margin: 2rem 0;
    }

    .tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .tool-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .tool-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--color-accent-gradient);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .tool-card:hover {
        transform: translateY(-4px);
        border-color: var(--color-accent-primary);
        box-shadow: 0 8px 30px rgba(0, 212, 170, 0.15);
    }

    .tool-card:hover::before {
        opacity: 1;
    }

    .tool-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
    }

    .tool-content {
        flex: 1;
    }

    .tool-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
    }

    .tool-description {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        line-height: 1.5;
    }

    .tool-features {
        margin-top: 0.75rem;
        padding-left: 1.25rem;
        font-size: 0.85rem;
        color: var(--color-text-muted);
    }

    .tool-features li {
        margin-bottom: 0.25rem;
    }

    .tool-arrow {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5rem;
        color: var(--color-accent-primary);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .tool-card:hover .tool-arrow {
        opacity: 1;
        right: 1rem;
    }

    .credits-section {
        margin-top: 3rem;
        text-align: center;
    }

    .credits-card {
        display: inline-block;
        padding: 1.5rem 2rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 12px;
    }

    .credits-card h3 {
        margin-bottom: 0.75rem;
        color: var(--color-text-primary);
    }

    .video-link {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: var(--color-accent-gradient);
        color: var(--color-bg-primary);
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin-bottom: 1rem;
        transition: transform 0.2s ease;
    }

    .video-link:hover {
        transform: scale(1.02);
    }

    .credits-links {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .credits-links a {
        color: var(--color-accent-secondary);
        text-decoration: none;
        font-size: 0.9rem;
    }

    .credits-links a:hover {
        text-decoration: underline;
    }

    .social-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        color: white !important;
        text-decoration: none !important;
    }

    .social-link:hover {
        transform: translateY(-2px);
        opacity: 0.9;
    }

    .social-link.youtube {
        background-color: #ff0000;
    }

    .social-link.twitch {
        background-color: #9146ff;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
