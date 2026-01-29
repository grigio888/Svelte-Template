export async function load({ locals, url }) {
	return {
		url: url.href,
		...locals
	};
}
