import cp from 'child_process';
import exp from 'constants';

const controller = new AbortController();
const { signal } = controller;

let error;

beforeAll(async () => {
	error = await build();
}, 500000);

it('should run production build with no errors', async () => {
	expect(error).toBeUndefined();
});

it('should correctly produce a manifest file', async () => {
	const manifest = require('../static/manifest.json');

	[
		"id",
		"name",
		"short_name",
		"theme_color",
		"background_color"
	].forEach((key) => {
		expect(manifest[key]).toBeTruthy();
	});

	expect(manifest.display).toBe('standalone');
	expect(manifest.orientation).toBe('portrait');
	expect(manifest.start_url).toBe('/');

	expect(manifest.icons).toHaveLength(2);
	manifest.icons.forEach((icon) => {
		expect(icon.src.includes('undefined')).not.toBeTruthy();
	});

});

async function build() {

	let error;
	try {
		await new Promise((resolve, reject) => {
			const script = cp.exec('gatsby clean', { signal });

			script.stdout.on('data', (data) => {
				if (data.includes('info Successfully deleted directories')) resolve();
				if (data.toLowerCase().includes('error')) reject(data);
			});
		});

		await new Promise((resolve, reject) => {
			const script = cp.exec('gatsby build', { signal });

			script.stdout.on('data', (data) => {
				if (data.includes('info Done building')) resolve();
				if (data.toLowerCase().includes('error')) reject(data);
			});
		});

	} catch (err) {
		controller.abort();
		error = err;
		throw err;
	}
	controller.abort();

	return error;
}