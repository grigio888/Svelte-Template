<script>
	// »»» Imports
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast: `min-h-16 w-90 p-4 flex gap-2 text-sm
            bg-(--bg-color-50) shadow-xl shadow-(color:--shadow-theme-color)
            border border-(--border-color) rounded-md`,

			error: 'text-red-400',
			success: 'text-emerald-500',
			warning: 'text-amber-500',
			info: 'text-sky-500',

			actionButton: `border border-(--border-color) rounded-md p-2 cursor-pointer
            rounded-md bg-(--bg-color-200) w-20 h-min my-auto text-nowrap`
		}
	}}
/>
