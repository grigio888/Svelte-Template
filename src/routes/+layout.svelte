<script>
	// »»» Imports
	import '../app.css';
	import { locale } from '$i18n/store.js';
	import { navigating } from '$app/stores';
	import { addLoadingToast, removeLoadingToast } from '$svc/toasts/lifecycle.svelte';

	// »»» Props
	let { data, children } = $props();

	// »»» Components
	import Toaster from '$comp/composed/sonner/Toaster.svelte';
	import PageTransition from '$comp/singular/PageTransition.svelte';
	import Background from '$comp/custom/Background.svelte';

	// »»» Reactivity
	let isLoading = $state(null);

	// »»» Logic
	if (data?.lang) locale.set(data.lang);

	$effect(async () => {
		// Allowing a loading feedback during navigation
		if ($navigating) {
			isLoading = true;
			addLoadingToast();
		} else if (isLoading) {
			isLoading = false;
			removeLoadingToast();
		}
	});
</script>

<Toaster />

<PageTransition refresh={data?.url}>
	<Background />
	{@render children?.()}
</PageTransition>
