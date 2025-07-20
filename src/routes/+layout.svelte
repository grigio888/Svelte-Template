<script>
	// »»» Imports
	import '../app.css';

	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { locale } from '$i18n/store.js';

	// »»» Props
	let { data, children } = $props();

	// »»» Components
	import PageTransition from '$comp/ui/PageTransition.svelte';
	import Toaster from '$comp/sonner/Toaster.svelte';

	// »»» Logic
	let language = $state(data?.lang);
	locale.set(language);
</script>

<PageTransition refresh={data?.url}>
	{@render children()}
</PageTransition>

<Toaster />
{#if PUBLIC_ENVIRONMENT !== 'production'}
	<div
		class="pointer-events-none fixed top-0 left-0 z-100 w-30 translate-x-[-25%]
    translate-y-[50%] rotate-315 transform border border-(--border-color) bg-(--color-theme-700) px-4 text-center
    text-xl text-white"
	>
		DEV
	</div>
{/if}
