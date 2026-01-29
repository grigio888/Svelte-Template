<script>
	// »»» Imports
	import { NavigationMenu } from 'bits-ui';

	// »»» Props
	let { class: classProp, title, triggerTitle, children } = $props();
</script>

<NavigationMenu.Item value="getting-started">
	<NavigationMenu.Trigger
		class="group inline-flex h-fit w-max items-center justify-center text-sm font-medium
        transition-colors hover:text-(--theme-color) focus:text-(--theme-color) 
        disabled:pointer-events-none disabled:opacity-50 {classProp}"
		title={triggerTitle}
	>
		{@render title()}
		<!-- <CaretDown
            class="relative top-[1px] ml-1 size-3 transition-transform duration-200
            group-data-[state=open]:rotate-180"
            aria-hidden="true"
        /> -->
	</NavigationMenu.Trigger>
	<NavigationMenu.Content
		class="data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left absolute
        top-0
        left-0
        w-full
        sm:w-auto"
	>
		{@render children?.()}
	</NavigationMenu.Content>
</NavigationMenu.Item>
