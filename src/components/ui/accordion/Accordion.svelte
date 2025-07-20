<script>
	// »»» Imports
	import { Accordion } from 'bits-ui';

	// »»» Props
	let { class: classProp, type, children } = $props();
</script>

<Accordion.Root class="w-full {classProp}" {type}>
	{@render children?.()}
</Accordion.Root>
