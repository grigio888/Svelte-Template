import { PUBLIC_API_URL, PUBLIC_API_URI } from '$env/static/public';
import { browser } from '$app/environment';
import { languageEnums } from '$svc/language/enums';
import Logger from '$modules/log';

let log = new Logger();

export default class API {
	constructor(user = false) {
		this.res = null;
		this.json = null;

		this._access_token = user?.tokens?.access;
		this._refresh_token = user?.tokens?.refresh;
		this._language = user?.preferences?.language || languageEnums.EN_US;
	}

	_path(path = '/') {
		let url = `${browser ? PUBLIC_API_URL : PUBLIC_API_URI}${path}`;

		return url;
	}

	setTokens(user) {
		const { access, refresh } = user.tokens;

		this._access_token = access;
		this._refresh_token = refresh;
	}

	async send({ method, path, data }) {
		const opts = {
			method,
			headers: {}
		};

		if (this._access_token) {
			opts.headers['Authorization'] = `Bearer ${this._access_token}`;
		}
		if (this._refresh_token) {
			opts.headers['RefreshToken'] = `${this._refresh_token}`;
		}

		if (this._language) {
			opts.headers['Accept-Language'] = this._language;
		}

		const treatedPath = this._path(path);

		if (data) {
			if (data instanceof FormData) {
				opts.body = data;
			} else {
				opts.headers['Content-Type'] = 'application/json';
				opts.body = JSON.stringify(data);
			}
		}

		try {
			this.res = await fetch(`${treatedPath}`, opts);

			log.debug(
				`api.${browser ? 'client' : 'server'}.[${method}] ${this.res.status} »»» ${treatedPath}`
			);

			if (opts.method === 'DELETE') this.json = null;
			else this.json = await this.res.json();
		} catch (e) {
			log.error('#'.repeat(50));
			log.error(
				`api.${browser ? 'client' : 'server'}.[${method}] ${this.res?.status || 'no status'} »»» ${treatedPath} »»» Error!`
			);
			log.error(`request.info: ${JSON.stringify(opts)}`);
			log.error(`response.info: ${JSON.stringify(this.res)}`);
			log.error(`error.info: ${e}`);
			log.error('#'.repeat(50));

			this.json = null;
			throw e;
		}

		return this.json;
	}

	get(path) {
		return this.send({ method: 'GET', path });
	}

	post(path, data) {
		return this.send({ method: 'POST', path, data });
	}

	put(path, data) {
		return this.send({ method: 'PUT', path, data });
	}

	patch(path, data) {
		return this.send({ method: 'PATCH', path, data });
	}

	del(path) {
		return this.send({ method: 'DELETE', path });
	}
}
