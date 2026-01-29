<script>
	// »»» Props
	let {
		id,
		name,
		value,
		checked = $bindable(false),
		onchange = () => {},
		indeterminate = false,
		class: classProp,
		children
	} = $props();

	// »»» Components
	import { Checkbox, Label } from 'bits-ui';

	// »»» Icons
	import Check from 'phosphor-svelte/lib/Check';
	import Minus from 'phosphor-svelte/lib/Minus';
</script>

<div class="flex items-center space-x-3 {classProp}">
	<Checkbox.Root
		{id}
		{name}
		{checked}
		{value}
		onCheckedChange={onchange}
		aria-labelledby="terms-label"
		class="data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background
        data-[state=unchecked]:hover:border-dark-40 peer
        inline-flex size-[25px]
        items-center justify-center rounded-md border border-(--border-color)
        bg-(--background-color) transition-all duration-150 ease-in-out active:scale-[0.98]"
		{indeterminate}
	>
		{#snippet children({ checked, indeterminate })}
			<div class="text-background inline-flex items-center justify-center">
				{#if indeterminate}
					<Minus class="size-[15px]" weight="bold" />
				{:else if checked}
					<Check class="size-[15px]" weight="bold" />
				{/if}
			</div>
		{/snippet}
	</Checkbox.Root>
	<Label.Root
		id="{name}-label"
		for={id}
		class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed
        peer-disabled:opacity-70"
	>
		{@render children?.()}
	</Label.Root>
</div>
