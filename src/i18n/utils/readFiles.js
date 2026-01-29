import fs from 'fs';
import path from 'path';

// »»» Tokens
function listJsAndSvelteFiles(directory) {
	/**
	 * @param {string} directory
	 *
	 * @returns {string[]} List of all JS and Svelte files in the directory and its sub
	 * directories.
	 */

	const result = [];

	function traverseDir(dir) {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const fullPath = path.join(dir, file);
			if (fs.statSync(fullPath).isDirectory()) {
				traverseDir(fullPath);
			} else if (file.endsWith('.js') || file.endsWith('.svelte')) {
				result.push(fullPath);
			}
		}
	}

	traverseDir(directory);
	return result;
}

function findWrappedTokens(filePath) {
	/**
	 * @param {string} filePath
	 *
	 * @returns {string[]} List of all tokens wrapped in _() in the file.
	 */

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const tokenRegex = /_\(\s*(['"`])([\s\S]*?)\1\s*(?:,|\))/g;
	const tokens = [];
	let match;

	while ((match = tokenRegex.exec(fileContent)) !== null) {
		if (match[2].includes('${')) continue;
		tokens.push(match[2]);
	}

	return tokens;
}

export function findAllTokensInDirectory(directory) {
	/**
	 * @param {string} directory
	 *
	 * @returns {string[]} List of all tokens wrapped in _() in all JS and Svelte files
	 */

	const files = listJsAndSvelteFiles(directory);
	const allTokens = new Set();

	for (const file of files) {
		const tokens = findWrappedTokens(file);
		tokens.forEach((token) => allTokens.add(token));
	}

	return Array.from(allTokens);
}
