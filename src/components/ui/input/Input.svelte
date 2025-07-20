<script>
	// »»» Props
	let { id, label, type = 'text', class: classProp, inputClass, ...props } = $props();

	// »»» Icons
	import Eye from 'phosphor-svelte/lib/Eye';
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed';

	// »»» Logic
	let seen = $state(false);
	let typeInput = $state(type);

	$effect(() => {
		if (type != 'password') return;

		if (seen) typeInput = 'text';
		else typeInput = 'password';
	});
</script>

<div class="flex w-full flex-col gap-2 {classProp}">
	<label for={id} class="ml-1 text-sm">{label}</label>
	<div class="relative w-full">
		{#if type == 'textarea'}
			<textarea
				type={typeInput}
				{id}
				{...props}
				class="focus:ring-opacity-50 w-full rounded-md border border-(--border-color) bg-(--color-bg-900) p-3
                py-2 text-sm focus:ring-2 focus:ring-(--color-theme-600) {inputClass}"
			></textarea>
		{:else}
			<input
				type={typeInput}
				{id}
				{...props}
				class="focus:ring-opacity-50 w-full rounded-md border border-(--border-color) bg-(--color-bg-900) p-3
                py-2 text-sm focus:ring-2 focus:ring-(--color-theme-600) {inputClass}"
			/>
			{#if type == 'password'}
				<button
					type="button"
					class="absolute top-1/2 right-3 translate-y-[-50%] transform"
					onclick={() => (seen = !seen)}
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
</div>
