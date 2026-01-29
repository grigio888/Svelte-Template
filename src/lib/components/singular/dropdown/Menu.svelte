<script>
	// »»» Props
	let {
		trigger,
		triggerClass = '',
		children,
		contentOffset = 8,
		class: contentClass = ''
	} = $props();

	// »»» Components
	import { DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="inline-flex size-10 cursor-pointer items-center justify-center
        rounded border border-(--border-color) bg-(--background-color) text-sm font-medium
        select-none active:scale-[0.98] {triggerClass}"
	>
		{@render trigger?.()}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="z-100 w-[90vw] rounded-md border
            border-(--border-color) shadow-lg shadow-(color:--shadow-theme-color)
            outline-hidden backdrop-blur-md focus-visible:outline-hidden
            md:mx-6 md:w-[229px] {contentClass}"
			sideOffset={contentOffset}
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
