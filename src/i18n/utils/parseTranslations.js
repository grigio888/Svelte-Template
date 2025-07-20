import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// »»» Translations
function listLanguageFolders(basePath) {
	const langsPath = path.join(basePath, 'src', 'i18n', 'langs');
	if (!fs.existsSync(langsPath)) {
		throw new Error(`Path not found: ${langsPath}`);
	}

	const folders = fs.readdirSync(langsPath).filter((folder) => {
		const fullPath = path.join(langsPath, folder);
		return fs.statSync(fullPath).isDirectory();
	});

	return folders.map((folder) => path.join('src', 'i18n', 'langs', folder));
}

export async function getTranslationsFromLanguageFolders(basePath) {
	const languageFolders = listLanguageFolders(basePath);
	const translations = {};

	for (const relativeFolderPath of languageFolders) {
		const indexPath = path.join(basePath, relativeFolderPath, 'index.js');
		const languageName = path.basename(relativeFolderPath); // Extract language name
		if (fs.existsSync(indexPath)) {
			try {
				const languageContent = await import(pathToFileURL(indexPath).href); // Convert to file URL
				if (typeof languageContent === 'object' && languageContent.default !== null) {
					translations[languageName] = Object.keys(languageContent.default);
				} else {
					console.warn(`Invalid content in ${indexPath}`);
				}
			} catch (error) {
				console.error(`Failed to import ${indexPath}:`, error);
			}
		} else {
			console.warn(`index.js not found in ${relativeFolderPath}`);
		}
	}

	return translations;
}
