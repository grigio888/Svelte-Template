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
			shouldTransitate = true;

			if (exclude.includes(from) || exclude.includes(to)) {
				shouldTransitate = false;
				return;
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
			onintrostart={() => {
				document.body.style.overflow = 'hidden';
				document.body.style.paddingRight = '3px';
			}}
			out:blur={{ duration: outDuration }}
			in:fly={{ x: xIn, duration: inDuration, delay: outDuration + 50 }}
			onoutroend={() => {
				setTimeout(() => {
					document.body.style.overflow = 'auto';
					document.body.style.paddingRight = '0px';
				}, inDuration);
			}}
			class="relative flex min-h-(--body-space) w-full flex-col items-center justify-start {classProp}"
		>
			{@render children()}
		</div>
	{/key}
{:else}
	<div
		class="relative flex min-h-(--body-space) w-full flex-col items-center justify-start {classProp}"
	>
		{@render children()}
	</div>
{/if}
