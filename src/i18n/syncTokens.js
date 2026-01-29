import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { findAllTokensInDirectory } from './utils/readFiles.js';
import { getTranslationsFromLanguageFolders } from './utils/parseTranslations.js';

async function syncTokensWithIndexes(basePath, directory) {
	/**
	 * @param {string} basePath - Base path for language folders.
	 * @param {string} directory - Directory to search for tokens.
	 *
	 * This function synchronizes tokens by ensuring only valid tokens are present in their respective language index.js files.
	 */

	const allTokens = findAllTokensInDirectory(directory);
	const translations = await getTranslationsFromLanguageFolders(basePath);

	for (const [language] of Object.entries(translations)) {
		const indexPath = path.join(basePath, 'src', 'i18n', 'langs', language, 'index.js');
		if (!fs.existsSync(indexPath)) {
			console.warn(`index.js not found for language: ${language}`);
			continue;
		}

		const parsedContent = await import(pathToFileURL(indexPath).href);
		const updatedContent = { ...parsedContent.default };

		let removedCount = 0;
		let addedCount = 0;

		// Remove tokens not in the project
		for (const token of Object.keys(updatedContent)) {
			if (!allTokens.includes(token)) {
				delete updatedContent[token];
				removedCount++;
			}
		}

		// Add missing tokens with an empty string
		allTokens.forEach((token) => {
			if (!(token in updatedContent)) {
				updatedContent[token] = '';
				addedCount++;
			}
		});

		const sortedContent = Object.keys(updatedContent)
			.sort()
			.reduce((acc, key) => {
				acc[key] = updatedContent[key];
				return acc;
			}, {});

		const newContent = `export default ${JSON.stringify(sortedContent, null, 4)};`;
		fs.writeFileSync(indexPath, newContent, 'utf-8');
		console.log(`Synchronized tokens for ${language} in ${indexPath}`);
		console.log(`Removed ${removedCount} tokens and added ${addedCount} tokens for ${language}`);
	}
}

await syncTokensWithIndexes('./', './src');
