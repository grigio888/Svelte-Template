<script>
	// »»» Props
	let { class: classProp, children } = $props();
</script>

<div
	class="flex w-80 flex-col items-center justify-center rounded-md border
    border-(--border-color) p-4 shadow-2xl shadow-(color:--color-theme-950) backdrop-blur-sm {classProp}"
>
	{@render children?.()}
</div>
