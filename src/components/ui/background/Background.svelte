<script>
    let innerWidth = $state(0);
    let innerHeight = $state(0);

    let squareSize = 20; // Size of each square
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#key innerWidth + '-' + innerHeight}
    <div
        class="background-squares fixed inset-0 max-h-[50%] pointer-events-none
        z-[-1] overflow-hidden"
    >
        {#each Array(Math.ceil(innerWidth / squareSize)) as _, i}
            {#each Array(Math.ceil(innerHeight / squareSize)) as _, j}
                <div
                    class="absolute transparent border-r-1 *:border-bg-100 border-b-1 opacity-15"
                    style="
                        left: {i * squareSize}px;
                        top: {j * squareSize}px;
                        width: {squareSize}px;
                        height: {squareSize}px;
                    "
                ></div>
            {/each}
        {/each}
        <div
            class="absolute inset-0
            bg-[linear-gradient(to_bottom,transparent_50%,var(--color-bg-100))]"
        ></div>
    </div>
{/key}

