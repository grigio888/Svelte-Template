<script>
	// »»» Props
	let { children } = $props();
</script>

<kbd
	class="inline-flex size-5 items-center justify-center
    rounded-md border border-(--color-bg-500) bg-(--color-bg-900) text-[10px] shadow-lg shadow-(color:--color-theme-950)"
>
	{@render children()}
</kbd>
