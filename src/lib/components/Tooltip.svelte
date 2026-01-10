<script lang="ts">
    interface Props {
        text: string;
    }

    let { text }: Props = $props();
    let showTooltip = $state(false);
</script>

<span
    class="tooltip-container"
    role="tooltip"
    onmouseenter={() => (showTooltip = true)}
    onmouseleave={() => (showTooltip = false)}
>
    <span class="info-icon" aria-label="Information">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
        </svg>
    </span>

    {#if showTooltip}
        <div class="tooltip-popup" role="tooltip">
            <div class="tooltip-content">
                {text}
            </div>
            <div class="tooltip-arrow"></div>
        </div>
    {/if}
</span>

<style>
    .tooltip-container {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin-left: 0.5rem;
    }

    .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 0;
        background: rgba(107, 74, 158, 0.3);
        color: var(--color-violet-secondary, #8b6abf);
        cursor: default;
        border-radius: 50%;
        transition: all var(--transition-fast, 0.15s ease);
    }

    .tooltip-container:hover .info-icon {
        color: var(--color-accent-primary, #ff6b00);
        background: rgba(255, 107, 0, 0.15);
        transform: scale(1.1);
    }

    .tooltip-popup {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 10px);
        transform: translateX(-50%);
        z-index: 1000;
        width: max-content;
        max-width: 320px;
        animation: tooltipSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
    }

    .tooltip-content {
        background: linear-gradient(
            145deg,
            var(--color-bg-card, #252550) 0%,
            var(--color-bg-secondary, #1a1a3a) 100%
        );
        border: 1px solid var(--color-violet-primary, #6b4a9e);
        border-radius: 12px;
        padding: 1rem 1.25rem;
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--color-text-secondary, #b8b8d0);
        box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(107, 74, 158, 0.2);
        backdrop-filter: blur(10px);
    }

    .tooltip-arrow {
        position: absolute;
        left: 50%;
        bottom: -7px;
        transform: translateX(-50%) rotate(45deg);
        width: 14px;
        height: 14px;
        background: var(--color-bg-secondary, #1a1a3a);
        border-right: 1px solid var(--color-violet-primary, #6b4a9e);
        border-bottom: 1px solid var(--color-violet-primary, #6b4a9e);
    }

    @keyframes tooltipSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
        }
    }

    /* Mobile: position tooltip to the left to avoid cutoff */
    @media (max-width: 640px) {
        .tooltip-popup {
            max-width: 280px;
            left: auto;
            right: -20px;
            transform: none;
        }

        .tooltip-arrow {
            left: auto;
            right: 25px;
            transform: rotate(45deg);
        }

        @keyframes tooltipSlideIn {
            from {
                opacity: 0;
                transform: translateY(8px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    }
</style>
