import fs from 'fs';

import regexes from '@lib/regexes';

let gotFour0Four;
const domainsWithoutEditorFile = [];


const i18nProperties = {
	strings: [],
	functions: []
};

beforeAll(() => {

	const domains = [];
	fs.readdirSync(__dirname).forEach(fileName => {
		// avoid non-directories
		if (!fs.statSync(`${__dirname}/${fileName}`).isDirectory()) return;
		// collect directory names
		domains.push(fileName);

		// if directory doesn't have a Editor.js file, include it in domainsWithoutEditorFile
		if (!fs.existsSync(`${__dirname}/${fileName}/Editor.js`)) {
			domainsWithoutEditorFile.push(fileName);
		}
	});

	domains.forEach(domainName => {
		gotFour0Four = require(`./${domainName}/404.js`).default;
		const i18n = require(`./${domainName}/i18n.js`).default;

		Object.keys(i18n).forEach((key) => iterate([key]));

		function iterate(keys) {
			const prop = keys.reduce((obj, key) => obj[key], i18n);
			if (typeof prop === 'function') return i18nProperties.functions.push(keys.slice(-1)[0]);
			if (typeof prop === 'string') return i18nProperties.strings.push(keys.slice(-1)[0]);
			if (typeof prop === 'object') return Object.keys(prop).forEach(key => iterate(keys.concat(key)));
			throw new Error('Unknown type');
		}
	});

});

describe('i18n', () => {

	it('should have not underscores for i18n functions', () => {
		expect(i18nProperties.functions.length).toBeGreaterThan(0);
		i18nProperties.functions.forEach((key) => {
			expect(key).not.toContain('_');
		});
	});

	it('should have snake_case for i18n strings', () => {
		expect(i18nProperties.strings.length).toBeGreaterThan(0);
		i18nProperties.strings.forEach((key) => {
			expect(key).toMatch(regexes.snakeCase);
		});
	});

});

it('should have a Editor.js file in each domain directory', () => {
	expect(domainsWithoutEditorFile.length).toBe(0);
});

it('should have a 404 page', async () => {
	expect(gotFour0Four).toBeTruthy();
});