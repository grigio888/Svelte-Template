<script>
	// »»» Imports
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast: `min-h-16 w-90 p-4 flex gap-2 
            text-sm
            bg-(--color-bg-100) shadow-xl shadow-(color:--color-theme-200)
            border border-(--border-color) rounded-md`,

			error: 'text-red-600',
			success: 'text-green-600',
			warning: 'text-yellow-600',
			info: 'text-sky-600',

			actionButton: `border border-(--border-color) rounded-md p-2 cursor-pointer
            rounded-md bg-(--color-bg-200) w-20 h-min my-auto text-nowrap`
		}
	}}
/>
