<script>
	// »»» Props
	let { class: classProp, children } = $props();

	// »»» Components
	import { DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Item
	class="rounded-button data-highlighted:bg-muted flex h-10 items-center p-3 text-sm
    font-medium ring-0! ring-transparent! select-none focus-visible:outline-none
    {classProp}"
>
	{@render children?.()}
</DropdownMenu.Item>
