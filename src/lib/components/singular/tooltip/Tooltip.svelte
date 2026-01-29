<script lang="ts">
	// »»» Imports
	import { Tooltip } from 'bits-ui';

	// »»» Props
	let {
		class: classProp,
		message,
		children,
		unstyled = false,
		offset = { x: -20, y: 0 }
	} = $props();

	// »»» Logic
	let triggerClass =
		$derived(`transition-background ring-dark ring-offset-background inline-flex size-10
        items-center justify-center rounded-full border border-(--border-color) bg-(--background-color)
        duration-300 hover:bg-(--background-color-hover) focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:outline-hidden ${classProp}`);
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger title={message} class={unstyled ? '' : triggerClass}>
			{@render children?.()}
		</Tooltip.Trigger>
		<Tooltip.Content side="bottom" align="center" collisionPadding={offset.y} sideOffset={offset.x}>
			<div
				class="z-0 flex items-center justify-center rounded-md
                border border-(--border-color) bg-(--background-color) p-3 text-sm font-medium shadow-lg
                shadow-(color:--shadow-theme-color) outline-hidden"
			>
				{message}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
