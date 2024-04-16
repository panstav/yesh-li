// get all filenames in entire project and inside all subdirectories, excluding node_modules
import { sync } from 'glob';
import fs from 'fs';

const hebrewChars = /[א-ת]/;

describe('I18n', () => {

	it('should not contain hebrew characters', () => {

		const files = sync('**/*.js', {
			ignore: [
				'node_modules/**/*', '.vscode/**/*', '.cache/**/*',
				'public/**/*', 'data/**/*', 'test/misc.test.js',
				'src/components/domains/**/*', 'src/components/themes/**/*',
				'src/components/pages/FromJunkToMagic/**/*',
			]
		});

		const filesWithHebrew = files.filter(file => {
			const content = fs.readFileSync(file, 'utf8');
			return hebrewChars.test(content);
		});

		expect(filesWithHebrew).toHaveLength(0);
	});

});