<script lang="ts">
    interface Props {
        rating: number;
        maxStars?: number;
    }

    let { rating, maxStars = 5 }: Props = $props();

    function getStarType(index: number): "filled" | "half" | "empty" {
        const position = index + 1;
        if (rating >= position) return "filled";
        if (rating >= position - 0.5) return "half";
        return "empty";
    }
</script>

<div class="stars-container">
    {#each Array(maxStars) as _, i}
        <span
            class="star"
            class:filled={getStarType(i) === "filled"}
            class:half={getStarType(i) === "half"}
        >
            ★
        </span>
    {/each}
</div>

<style>
    .stars-container {
        display: inline-flex;
        gap: 2px;
    }

    .star {
        font-size: 1.2rem;
        color: #3a4a5e;
        transition: all 0.2s ease;
    }

    .star.filled {
        color: #fbbf24;
        text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
    }

    .star.half {
        background: linear-gradient(90deg, #fbbf24 50%, #3a4a5e 50%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
