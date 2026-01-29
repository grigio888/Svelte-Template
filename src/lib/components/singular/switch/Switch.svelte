<script lang="ts">
	// »»» Imports
	import { Switch } from 'bits-ui';

	// »»» Props
	let { checked = $bindable(true) } = $props();
</script>

<Switch.Root
	class="focus-visible:ring-foreground focus-visible:ring-offset-background inline-flex h-7 min-h-7 w-12 shrink-0
    cursor-pointer items-center rounded-full border-2 border-(--border-color)
    px-0.5 transition-colors
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden
    disabled:cursor-not-allowed disabled:opacity-50
    data-[state=checked]:border-(--theme-color) data-[state=checked]:bg-(--theme-color)
    data-[state=unchecked]:border-(--shadow-theme-color) data-[state=unchecked]:bg-(--shadow-theme-color)
    "
	bind:checked
>
	<Switch.Thumb
		class="data-[state=unchecked]:shadow-mini pointer-events-none block size-5.5
        shrink-0 rounded-full border border-(--border-color) bg-(--background-color)
        transition-transform 
        data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 "
	/>
</Switch.Root>
