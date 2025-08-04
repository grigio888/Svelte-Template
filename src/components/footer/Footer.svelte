<script>
    // »»» Imports
    import { translate as _ } from '$i18n/translate';

    // »»» Components
    import Slogan from '$comp/ui/slogan/Slogan.svelte';
</script>

<footer class="w-full h-40 p-4 border-t border-(--color-theme-300) bg-(--color-bg-100)">
    <div class="container mx-auto mb-6 md:mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p class="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} MyApp. {_("All rights reserved.")}
        </p>
        <nav class="flex gap-4">
            <a href="/about" class="text-sm text-gray-600 hover:text-gray-800">{_("About")}</a>
            <a href="/contact" class="text-sm text-gray-600 hover:text-gray-800">{_("Contact")}</a>
        </nav>
    </div>

    <Slogan />
</footer>