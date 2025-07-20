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
</script>

{#if !href}
	<Button.Root
		class=" 
            {!secondary
			? 'bg-(--color-theme-700) hover:bg-(--color-theme-600)'
			: `border border-(--border-color)
                bg-(--color-bg-950) hover:shadow-[0_0px_10px] hover:shadow-(color:--color-theme-700)`}
            {!pill ? 'rounded-md' : 'rounded-full'}
            transition-background inline-flex h-10 w-full items-center justify-center
            text-sm text-[15px] font-semibold shadow-xs
            duration-300 active:scale-[0.98] active:transition-all
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
            {classProp}"
		{...props}
	>
		{@render children?.()}
	</Button.Root>
{:else}
	<a
		{href}
		class=" 
            {!secondary
			? 'bg-(--color-theme-800) hover:bg-(--color-theme-950)'
			: `border border-(--border-color)
                bg-(--color-bg-950) hover:shadow-[0_0px_10px] hover:shadow-(color:--color-theme-700)`}
            {!pill ? 'rounded-md' : 'rounded-full'}
            transition-background inline-flex h-10 w-full items-center justify-center
            text-sm text-[15px] font-semibold shadow-xs
            duration-300 active:scale-[0.98] active:transition-all
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
            {classProp}"
		{...props}
	>
		{@render children?.()}
	</a>
{/if}
