import Logger from '$comp/modules/log';

let log = new Logger();

export async function load({ locals, url }) {
	let prefix = 'root » layout.server';
	log.debug(`${prefix} »»» Passing user, lang and url used on PageTransition.`);

	return {
		user: locals?.user,
		lang: locals?.lang,
		url: url.href
	};
}
