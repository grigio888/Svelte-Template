<script>
	// »»» Props
	let { trigger, children } = $props();

	// »»» Components
	import { DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="inline-flex h-10 w-10
        items-center justify-center rounded-full border border-(--border-color) text-sm font-medium select-none
        active:scale-[0.98]"
	>
		{@render trigger?.()}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="z-100 mx-5 w-[90vw] rounded-md border
            border-(--border-color) px-1 py-1.5 shadow-lg shadow-(color:--color-theme-950) outline-hidden
            backdrop-blur-md focus-visible:outline-hidden md:mx-6 md:w-[229px]"
			sideOffset={8}
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
