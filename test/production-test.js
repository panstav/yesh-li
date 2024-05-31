import fs, { createReadStream } from 'fs';
import cp from 'child_process';

import { parseSitemap } from 'sitemap';

import { themes as themesMap } from 'yeshli-shared';

const controller = new AbortController();
const { signal } = controller;

let sitemap, error;

beforeAll(async () => {
	error = await build();
	sitemap = await parseSitemap(createReadStream('./public/sitemap.xml'));
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

describe('sitemap', () => {

	it('should have a unique set of urls', async () => {
		const urls = sitemap.map(({ url }) => url);
		const uniqueUrls = new Set(urls);
		expect(uniqueUrls.size).toBe(urls.length);
	});

	it('should have only valid urls', async () => {
		let error;
		sitemap.forEach(({ url }) => {
			try {
				new URL(url);
			} catch (err) {
				error = err;
			}
		});

		expect(error).toBeUndefined();
	});

});

it('should set the yl meta tags on all pages', async () => {

	// get all html pages in the public directory and its subdirectories
	const pages = getHtmlFilesRecursively('./public');

	// get the yl meta tag content from each page
	const metaTagsPerPage = pages.map((page) => getYlMetaTagContent(fs.readFileSync(page, 'utf8')));

	// ensure all domains are present in themes map
	const parentDomains = themesMap.map(({ parentDomain }) => parentDomain.replace('.', ''));

	metaTagsPerPage.forEach(({ hostDomain, parentDomain }) => {
		// check that all host domains are valid urls
		expect(hostDomain).toBeTruthy();
		expect(() => new URL(`https://${hostDomain}`)).not.toThrow();
		// check that all parent domains are listed in the parentDomains array
		expect(parentDomain).toBeTruthy();
		expect(parentDomains).toContain(parentDomain);
	});

	function getHtmlFilesRecursively(dir, accu = []) {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const name = `${dir}/${file}`;
			if (fs.statSync(name).isDirectory() && !['404', '_gatsby'].some((irrelevantDir) => name.includes(irrelevantDir))) {
				getHtmlFilesRecursively(name, accu);
			} else if (name.endsWith('.html') && !name.includes('404')) {
				accu.push(name);
			}
		}
		return accu;
	}

	function getYlMetaTagContent(html) {
		const metaTags = html.match(/<meta [^>]*>/g);

		return {
			parentDomain: getContentForMetaTagName('parent_domain'),
			hostDomain: getContentForMetaTagName('host_domain')
		};

		function getContentForMetaTagName(tagName) {
			return metaTags.filter((tag) => tag.includes(`yl:${tagName}`))[0].match(/content="([^"]*)"/)[1];
		}
	}


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