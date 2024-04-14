import fs from 'fs';

const i18nProperties = {
	strings: []
};

beforeAll(() => {

	const domains = [];
	fs.readdirSync(__dirname).forEach(fileName => {
		// avoid non-directories
		if (!fs.statSync(`${__dirname}/${fileName}`).isDirectory()) return;
		// collect directory names
		domains.push(fileName);
	});

	domains.forEach(domainName => {
		const i18n = require(`./${domainName}/i18n.js`).default;

		Object.keys(i18n).forEach((key) => iterate([key]));

		function iterate(keys) {
			const prop = keys.reduce((obj, key) => obj[key], i18n);
			if (typeof prop === 'function') return;
			if (typeof prop === 'string') return i18nProperties.strings.push(keys.slice(-1)[0]);
			if (typeof prop === 'object') return Object.keys(prop).forEach(key => iterate(keys.concat(key)));
			throw new Error('Unknown type');
		}
	});

});

it('should have snake_case for i18n strings', () => {
	expect(i18nProperties.strings.length).toBeGreaterThan(0);
	i18nProperties.strings.forEach((key) => {
		expect(key).toMatch(/^[a-z0-9_]+$/);
	});
});