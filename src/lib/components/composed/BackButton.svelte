<script>
	// »»» Imports
	import { page } from '$app/stores';
	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let { border, class: className, children } = $props();

	// »»» Components
	import Tooltip from '$comp/singular/tooltip/Tooltip.svelte';

	// »»» Icons
	import { ArrowLeft } from 'phosphor-svelte';

	// »»» Reactivities
	let currentPage = $state($page.url.pathname);
	let goTo = $state(null);

	// »»» Logic
	$effect(() => {
		currentPage = $page.url.pathname;

		if (!currentPage || currentPage === '/') {
			goTo = null;
			return;
		}

		let path = currentPage !== '/' ? currentPage.replace(/\/+$/, '') : currentPage;

		const idx = path.lastIndexOf('/');

		goTo = idx <= 0 ? '/' : path.slice(0, idx);
	});

	let borderClass = 'border border-(--border-color) rounded bg-(--background-color)';
</script>

{#if goTo}
	<Tooltip message={_('button.back')} unstyled={true} offset={{ x: 0, y: 8 }}>
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={goTo}
			class="inline-flex size-10 cursor-pointer items-center justify-center
            {border ? borderClass : ''} text-sm font-medium
            select-none active:scale-[0.98] {className}"
			title={_('button.back')}
		>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
			<ArrowLeft size={20} />
			{@render children?.()}
		</a>
	</Tooltip>
{/if}
