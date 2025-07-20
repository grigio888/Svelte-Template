import { PUBLIC_BACKEND_URL, PUBLIC_BACKEND_URI } from '$env/static/public';
import { browser } from '$app/environment';
import Logger from '$comp/modules/log';

let log = new Logger();

export default class API {
	constructor(user = false) {
		this.res = null;
		this.json = null;

		this._access_token = user?.tokens?.access;
		this._refresh_token = user?.tokens?.refresh;
	}

	_path(path = '/') {
		let url = `${browser ? PUBLIC_BACKEND_URL : PUBLIC_BACKEND_URI}${path}`;

		return url;
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
			opts.headers['Refresh-Token'] = `${this._refresh_token}`;
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
