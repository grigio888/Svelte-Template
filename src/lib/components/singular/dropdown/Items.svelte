<script>
	// »»» Props
	let { class: classProp, children } = $props();

	// »»» Components
	import { DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Item
	class="rounded-button data-highlighted:bg-muted flex min-h-10 items-center text-sm
    font-medium ring-0! ring-transparent! select-none focus-visible:outline-none
    {classProp}"
>
	{@render children?.()}
</DropdownMenu.Item>
