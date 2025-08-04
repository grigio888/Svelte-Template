<script lang="ts">
	// »»» Props
	let {
        message = '',
        class: classProp = '',
        children,
    } = $props();

	// »»» Components
	import { Tooltip } from 'bits-ui';

    // »»» Logic
    let defaultWrapperClass = `relative transition-background ring-(--color-bg-300) ring-offset-background
        inline-flex size-10! items-center justify-center rounded-full border border-(--color-theme-300)
        bg-(--color-bg-100) duration-300 hover:bg-(--color-bg-300) focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:outline-hidden ${classProp}
    `;
    let defaultTooltipClass = `z-0 flex items-center justify-center rounded-md
        border border-(--color-theme-300) bg-(--color-bg-100) p-3 text-sm shadow-lg
        shadow-(color:--color-theme-300) outline-hidden
    `;
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger
			class={classProp != 'none' ? defaultWrapperClass : 'w-full'}
		>
            {@render children()}
		</Tooltip.Trigger>
		<Tooltip.Content sideOffset={10}>
			<div
                class={message ? defaultTooltipClass : 'hidden'}
			>
				{message}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
