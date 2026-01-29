export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function phraseInHighlight(phrase, char = '-', lineLength = '50') {
	let sides = (lineLength - phrase.length - 1) / 2;
	let left = char.repeat(Math.floor(sides));
	let right = char.repeat(Math.ceil(sides));
	return `${left} ${phrase} ${right}`;
}

export function generateSlug(string) {
	return string
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

export function extractTokens(cookieEntry) {
	return {
		access: cookieEntry.split(',')[0],
		refresh: cookieEntry.split(',')[1]
	};
}
