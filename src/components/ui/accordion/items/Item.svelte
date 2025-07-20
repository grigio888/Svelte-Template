<script>
	// »»» Imports
	import { Accordion } from 'bits-ui';

	// »»» Props
	let { id, class: classProp, classContent, title, children } = $props();

	// »»» Icons
	import { CaretDown } from 'phosphor-svelte';
</script>

<Accordion.Item value={id} class="group border-b border-(--border-color)">
	<Accordion.Header>
		<Accordion.Trigger
			class="flex w-full flex-1 items-center justify-between text-[15px]
            font-medium transition-all select-none [&[data-state=open]>span>svg]:rotate-180
            {classProp}"
		>
			<span class="w-full text-left">
				{@render title()}
			</span>
			<span
				class="relative inline-flex h-5 w-6 items-center justify-center
                rounded-full border border-(--border-color)"
			>
				<CaretDown
					class="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 transform
                transition-transform duration-200"
				/>
			</span>
		</Accordion.Trigger>
	</Accordion.Header>
	<Accordion.Content
		class="data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down overflow-hidden bg-(--color-bg-900)
        text-sm tracking-[-0.01em] {classContent ? classContent : classProp}"
	>
		{@render children?.()}
	</Accordion.Content>
</Accordion.Item>
