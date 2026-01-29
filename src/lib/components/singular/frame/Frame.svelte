<script>
	// »»» Props
	let { this: frame = $bindable(), class: classProp, children } = $props();
</script>

<div
	bind:this={frame}
	class="flex w-80 flex-col items-center justify-center rounded-md border
    border-(--border-color) p-4 shadow-xl shadow-(color:--shadow-theme-color) backdrop-blur-[3px]
    {classProp}"
>
	{@render children?.()}
</div>
