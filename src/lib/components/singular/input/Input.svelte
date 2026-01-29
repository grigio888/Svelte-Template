<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let {
		id,
		label,
		type = 'text',
		class: classProp,
		inputClass,
		input = $bindable(),
		value = $bindable(),
		...props
	} = $props();

	// »»» Icons
	import Eye from 'phosphor-svelte/lib/Eye';
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed';

	// »»» Logic
	let seen = $state(false);
	let typeInput = $derived(type);

	$effect(() => {
		if (type != 'password') return;

		if (seen) typeInput = 'text';
		else typeInput = 'password';
	});

	let defaultClass = `focus:ring-opacity-50 w-full rounded-md border border-(--border-color)
        bg-(--background-color) p-3 py-2 text-sm focus:ring-2 focus:ring-(--color-theme-600)`;
</script>

{#snippet inputComponent()}
	<div class="relative w-full">
		{#if type == 'textarea'}
			<textarea
				type={typeInput}
				{id}
				bind:this={input}
				bind:value
				{...props}
				class="{defaultClass}
            {inputClass}"
			></textarea>
		{:else}
			<input
				type={typeInput}
				{id}
				bind:this={input}
				bind:value
				{...props}
				class="{defaultClass}
            {inputClass}"
			/>

			{#if type == 'password'}
				<button
					type="button"
					class="absolute top-1/2 right-3 translate-y-[-50%] transform"
					onclick={() => (seen = !seen)}
					title={_('button.showPassword')}
				>
					{#if !seen}
						<EyeClosed />
					{:else}
						<Eye />
					{/if}
				</button>
			{/if}
		{/if}
	</div>
{/snippet}

{#if label && typeof label === 'string'}
	<div class="flex w-full flex-col gap-2 {classProp}">
		<label for={id} class="ml-1">{label}</label>
		{@render inputComponent()}
	</div>
{:else if label && typeof label === 'object'}
	<div class="flex w-full flex-col gap-2 {classProp}">
		<label for={id} class="flex items-center gap-1">
			<label.icon size="16" class="mr-2 inline-block" />
			{label.title}
		</label>
		{@render inputComponent()}
	</div>
{:else}
	{@render inputComponent()}
{/if}
