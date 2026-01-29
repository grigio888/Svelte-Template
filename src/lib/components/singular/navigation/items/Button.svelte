<script>
	// »»» Imports
	import { NavigationMenu } from 'bits-ui';

	// »»» Props
	let {
		class: classProp,
		wrapped = true,
		onclick,
		title,
		classTitle,
		content,
		classContent
	} = $props();
</script>

{#snippet body()}
	<button
		class={classProp
			? classProp
			: 'inline-flex h-8 w-max items-center justify-center transition-colors hover:text-(--color-theme-600) focus:text-(--color-theme-600) '}
		{onclick}
	>
		<div class={classTitle ? classTitle : 'text-sm font-medium'}>
			{@render title()}
		</div>
		{#if content}
			<p
				class={classContent
					? classContent
					: 'text-muted-foreground line-clamp-2 text-sm leading-snug'}
			>
				{@render content()}
			</p>
		{/if}
	</button>
{/snippet}

{#if wrapped}
	<NavigationMenu.Item>
		{@render body()}
	</NavigationMenu.Item>
{:else}
	{@render body()}
{/if}
