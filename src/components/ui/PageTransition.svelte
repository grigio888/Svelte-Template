<script>
	// »»»»» Imports
	import { navigating } from '$app/stores';
	import { blur, fly } from 'svelte/transition';

	// »»»»» Props
	let { refresh, exclude = [], class: classProp, children } = $props();

	// »»»»» Logic
	let velocity = 10;
	let xIn = $state(velocity);

	let shouldTransitate = $state(true);

	$effect(() => {
		let from = $navigating?.from.route.id;
		let to = $navigating?.to.route.id;

		if (from && to) {
			for (let i = 0; i < exclude.length; i++) {
				shouldTransitate = true;

				if (from.includes(exclude[i]) && to.includes(exclude[i])) {
					shouldTransitate = false;
					break;
				}
			}

			let fromCount = from == '/' ? 0 : (from.match(/\//g) || []).length;
			let toCount = to == '/' ? 0 : (to.match(/\//g) || []).length;

			if (fromCount > toCount) {
				xIn = velocity * -1;
			} else {
				xIn = velocity;
			}
		}
	});

	// The intention here is to blur out the old page and fly in the new one.
	// Also, we want to make sure that the scroll isn't visible during the transition,
	// because this could cause a flicker effect.

	let outDuration = 300;
	let inDuration = 500;
</script>

{#if shouldTransitate}
	{#key refresh}
		<div
			onintrostart={() => (document.body.style.overflow = 'hidden')}
			out:blur={{ duration: outDuration }}
			in:fly={{ x: xIn, duration: inDuration, delay: outDuration + 50 }}
			onoutroend={() => setTimeout(() => (document.body.style.overflow = 'auto'), inDuration)}
			class="flex h-[94vh] w-full flex-col items-center {classProp}"
		>
			{@render children()}
		</div>
	{/key}
{:else}
	<div class="flex h-[94vh] w-full flex-col items-center {classProp}">
		{@render children()}
	</div>
{/if}
