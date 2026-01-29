<script>
	// »»» Props
	let { title, href, children } = $props();

	// »»» Components
	import Tooltip from '../tooltip/Tooltip.svelte';
</script>

<Tooltip message={title} unstyled={true}>
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		{href}
		aria-label={title}
		{title}
		class="inline-flex size-10 cursor-pointer items-center justify-center
        rounded border border-(--border-color) bg-(--background-color) text-sm font-medium
        select-none active:scale-[0.98]"
	>
		{@render children()}
	</a>
</Tooltip>
