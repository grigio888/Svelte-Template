<script>
	// »»» Imports
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast: `min-h-16 w-90 p-4 flex gap-2 text-sm
            bg-(--background-color) shadow-xl shadow-(color:--theme-color-950)
            border border-(--border-color) rounded-md`,

			error: 'text-(--error-color)',
			success: 'text-(--success-color)',
			warning: 'text-(--warning-color)',
			info: 'text-(--info-color)',

			actionButton: `border border-(--border-color) rounded-md p-2 cursor-pointer
            rounded-md bg-(--bg-color-900) w-20 h-min my-auto text-nowrap`
		}
	}}
/>
