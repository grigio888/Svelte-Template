<script>
	// »»» Imports
	import { NavigationMenu } from 'bits-ui';

	// »»» Props
	let { class: classProp, appearOn = 'right', children } = $props();
</script>

<NavigationMenu.Root class="relative z-10 flex justify-center {classProp}">
	<NavigationMenu.List class="group flex list-none items-center justify-center gap-4">
		{@render children?.()}
	</NavigationMenu.List>
	<div
		class="absolute top-full flex transform justify-center perspective-[2000px]
        {appearOn == 'right' ? 'left-0 translate-x-[-1em]' : 'right-0 translate-x-[1em]'}"
	>
		<NavigationMenu.Viewport
			class="data-[state=closed]:animate-scale-out
            data-[state=open]:animate-scale-in relative mt-2.5
            h-[var(--bits-navigation-menu-viewport-height)] w-[90vw]
            origin-[top_center] overflow-hidden rounded-md border border-(--border-color)
            bg-(--color-bg-950) shadow-lg
            shadow-(color:--color-theme-700) transition-[width,_height] duration-200
            md:w-[var(--bits-navigation-menu-viewport-width)]"
		/>
	</div>
</NavigationMenu.Root>
