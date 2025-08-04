<script>
	// »»» Imports
	import '../app.css';

	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { locale } from '$i18n/store.js';
    import { toast } from 'svelte-sonner';
    import { goto } from '$app/navigation';
    import { translate as _ } from '$i18n/translate';
    import { page } from '$app/stores';

	// »»» Props
	let { data, children } = $props();

	// »»» Components
    import Header from '$comp/header/Header.svelte';
	import PageTransition from '$comp/ui/PageTransition.svelte';
	import Background from '$comp/ui/background/Background.svelte';
	import Toaster from '$comp/sonner/Toaster.svelte';

	// »»» Logic
	let language = $state(data?.lang);
	locale.set(language);
</script>

<Header />

<Background />

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
