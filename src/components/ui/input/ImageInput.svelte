<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let {
		id,
		label = _('Click to upload an image'),
		existingImage = $bindable(''),
		class: classProp,
		...props
	} = $props();

	// »»» Icons
	import { CloudArrowUp } from 'phosphor-svelte';

	// »»» Logic
	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				existingImage = reader.result;
			};
			reader.readAsDataURL(selectedFile);
		}
	}
</script>

<input {id} type="file" name="{id}_image" accept="image/*" hidden onchange={handleFileChange} />

<div
	class="{classProp
		? classProp
		: 'aspect-[3/1] rounded-md'} relative overflow-hidden border border-(--border-color)"
>
	{#if existingImage}
		<img
			src={existingImage}
			alt="Preview"
			class="pointer-events-none absolute top-0 left-0 h-full w-full rounded-md object-cover"
			onerror={(event) => {
				event.target.src = 'https://placehold.co/600x400';
			}}
		/>
	{/if}
	<label
		for={id}
		class="z-10 flex h-full cursor-pointer flex-col items-center justify-center
        rounded-md bg-(--color-bg-900) transition-opacity
        {existingImage ? 'opacity-50 hover:opacity-50 md:opacity-0' : ''}"
	>
		<CloudArrowUp class="size-10" />
		<p class="text-center text-sm">
			{label}
		</p>
	</label>
</div>
