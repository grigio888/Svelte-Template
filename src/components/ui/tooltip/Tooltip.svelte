<script lang="ts">
	// »»» Props
	let props = $props();

	// »»» Components
	import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger
			class="transition-background ring-dark ring-offset-background inline-flex size-10 items-center
            justify-center rounded-full border border-(--border-color) bg-(--color-bg-950) duration-300
            hover:bg-(--color-bg-900) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden
            {props.class}"
		>
			{@render props.children()}
		</Tooltip.Trigger>
		<Tooltip.Content sideOffset={8}>
			<div
				class="z-0 flex items-center justify-center rounded-md
                border border-(--border-color) bg-(--color-bg-950) p-3 text-sm font-medium shadow-lg
                shadow-purple-700/50 outline-hidden"
			>
				{props.message}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
