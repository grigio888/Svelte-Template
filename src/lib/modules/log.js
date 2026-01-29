import { PUBLIC_LOG_LEVEL, PUBLIC_LOG_FORMAT } from '$env/static/public';

let logHierarchy = {
	DEBUG: 0,
	INFO: 1,
	WARNING: 2,
	ERROR: 3,
	CRITICAL: 4
};

export default class Logger {
	constructor(prefix = '') {
		this._level = PUBLIC_LOG_LEVEL;
		this._format = PUBLIC_LOG_FORMAT;
		this._custom_prefix = prefix;
	}

	prefix(level) {
		let currentPrefix = this._format
			.replace('%(levelname)s', level.padEnd(5))
			.replace('%(asctime)s', this.currentDateTime);

		if (this._custom_prefix) {
			currentPrefix += ` ${this._custom_prefix} »»» `;
		}

		return currentPrefix;
	}

	get currentDateTime() {
		const currentDateTime = new Date();
		return currentDateTime.toISOString().replace('T', ' ').split('.')[0].replace(/-/g, ':');
	}

	shouldLog(level) {
		return logHierarchy[this._level] <= logHierarchy[level];
	}

	debug(...messages) {
		if (this.shouldLog('DEBUG')) {
			console.debug(this.prefix('DEBUG'), ...messages);
		}
	}

	info(...message) {
		if (this.shouldLog('INFO')) {
			console.log(this.prefix('INFO'), ...message);
		}
	}

	warn(...message) {
		if (this.shouldLog('WARNING')) {
			console.warn(this.prefix('WARNING'), ...message);
		}
	}

	error(...message) {
		if (this.shouldLog('ERROR')) {
			console.error(this.prefix('ERROR'), ...message);
		}
	}
}
