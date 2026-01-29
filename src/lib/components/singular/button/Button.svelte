<script>
	// »»» Props
	let {
		secondary = undefined,
		pill = undefined,
		href = undefined,
		class: classProp,
		children,
		...props
	} = $props();

	// »»» Components
	import { Button } from 'bits-ui';

	// »»» Styles
	let defaultClass = $derived(`
        transition-background inline-flex h-10 w-full items-center justify-center
        text-sm text-[15px] font-semibold shadow-xs
        duration-300 active:scale-[0.98] transition-all
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
        overflow-hidden cursor-pointer
        ${classProp}
    `);
	let primaryClass =
		'border border-(--border-color) bg-(--theme-color-500) hover:bg-(--theme-color-400) text-(--background-color)';
	let secondaryClass = `border border-(--border-color) bg-(--background-color) hover:shadow-[0_0px_20px]
        hover:shadow-(color:--shadow-theme-color)`;
</script>

{#if !href}
	<Button.Root
		class="{defaultClass} {!secondary ? primaryClass : secondaryClass} {!pill
			? 'rounded-md'
			: 'rounded-full'}"
		{...props}
	>
		{@render children?.()}
	</Button.Root>
{:else}
	<a
		{href}
		class="{defaultClass} {!secondary ? primaryClass : secondaryClass} {!pill
			? 'rounded-md'
			: 'rounded-full'}"
		{...props}
	>
		{@render children?.()}
	</a>
{/if}
