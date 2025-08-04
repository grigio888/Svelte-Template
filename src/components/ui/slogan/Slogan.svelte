<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';

    let name = _("Site's Name");

    let words = name.split(' ');
    let splitIndex = Math.ceil(words.length / 2);
    if (words.length === 3) splitIndex = 2;
    if (words.length === 5) splitIndex = 3;
    let firstPart = words.slice(0, splitIndex).join(' ');
    let secondPart = words.slice(splitIndex).join(' ');
</script>

<h1 class="w-full text-center text-4xl md:text-6xl font-bold">
	{firstPart} <span class="text-(--color-theme-600)">{secondPart}</span>
</h1>
