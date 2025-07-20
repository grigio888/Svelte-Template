<script>
	// »»» Imports
	import { Select } from 'bits-ui';

	// »»» Props
	let {
		class: classProp,
		multiple,
		placeholder = { icon: undefined, title: '' },
		items = [
			{ value: 'option-1', label: 'Option 1', selected: true },
			{ value: 'option-2', label: 'Option 2' },
			{ value: 'option-3', label: 'Option 3 (disabled)', disabled: true }
		],
		value = $bindable('')
	} = $props();

	// »»» Icons
	import { Check, CaretUpDown, CaretDoubleUp, CaretDoubleDown } from 'phosphor-svelte';

	const selectedLabel = $derived.by(() => {
		let selected;

		if (multiple) {
			selected = items
				.filter((item) => value.includes(item.value))
				.map((item) => item.label)
				.join(', ');
		} else {
			selected = items.find((item) => item.value === value)?.label;
		}

		return selected || placeholder.title;
	});
</script>

<Select.Root type={multiple ? 'multiple' : 'single'} {items} onValueChange={(v) => (value = v)}>
	<Select.Trigger
		class="h-input data-placeholder:text-foreground-alt/50 inline-flex items-center rounded-md border
            border-(--border-color) bg-(--color-bg-900) p-3 py-2 text-sm
            transition-colors select-none hover:bg-(--color-bg-800)
            {classProp}"
		aria-label={placeholder?.title}
	>
		{#if placeholder.icon}
			<placeholder.icon class="mr-[9px] size-4" />
		{/if}
		{selectedLabel}
		<CaretUpDown class="text-muted-foreground ml-auto size-5" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="focus-override data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out
            data-[side=top]:animate-enter-from-bottom data-[side=bottom]:animate-enter-from-top data-[side=left]:animate-enter-from-right data-[side=right]:animate-enter-from-left z-50 max-h-[20em] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]
            rounded-md border border-(--border-color) bg-(--color-bg-900) 
            px-1 py-3
            shadow-md shadow-(color:--color-theme-800)
            outline-hidden select-none"
			sideOffset={5}
		>
			<Select.ScrollUpButton class="flex w-full items-center justify-center">
				<CaretDoubleUp class="size-3" />
			</Select.ScrollUpButton>
			<Select.Viewport class="p-1">
				{#each items as item, i (i + item.value)}
					<Select.Item
						class="rounded-button flex h-10
                    w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize outline-hidden select-none
                    data-disabled:opacity-50 data-highlighted:bg-(--color-bg-800)"
						value={item.value}
						label={item.label}
						disabled={item.disabled}
					>
						{#snippet children({ selected })}
							{item.label}
							{#if selected}
								<div class="ml-auto">
									<Check />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton class="flex w-full items-center justify-center">
				<CaretDoubleDown class="size-3" />
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
