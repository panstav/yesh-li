import fs, { createReadStream } from 'fs';
import cp from 'child_process';

import { parseSitemap } from 'sitemap';

import { themes as themesMap } from 'yeshli-shared';

const controller = new AbortController();
const { signal } = controller;

let buildError, sitemap, metaTagsPerPage;

beforeAll(async () => {
	buildError = await build();
	metaTagsPerPage = getMetaTagsPerPage();
	sitemap = await parseSitemap(createReadStream('./public/sitemap.xml'));
}, 500000);

it('should run production build with no errors', async () => {
	expect(buildError).toBeUndefined();
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

	describe('should have the correct set of paths', () => {

		let sitemapUrls;
		const sitemapPaths = [];

		beforeAll(() => {

			// get the path to the homepage, it should be the shortest of all paths
			const homepageUrl = sitemap.reduce((accu, { url }) => {
				if (url.length < accu.length) return url;
				return accu;
			}, sitemap[0].url);

			sitemapUrls = sitemap.map(({ url }) => url.replace(homepageUrl, '/'));
		});

		it('should correspond to the pages in the public directory', async () => {

			getMetaTagsPerPage().forEach(({ path }) => {
				const url = path.replace('./public', '').replace('/index.html', '') || '/';
				expect(sitemapUrls).toContain(url);
				sitemapPaths.push(url);
			});

			expect(sitemapUrls.length).toBe(sitemapPaths.length);
		});

		it('should not include the admin or editor pages', () => {
			expect(sitemapUrls).not.toContain('/admin');
			expect(sitemapUrls).not.toContain('/editor');
		});

	});

});

describe('meta tags', () => {

	it('should set the yl meta tags on all pages', async () => {

		// get the yl meta tag content from each page
		const ylTagPairs = metaTagsPerPage.map(({ tags }) => ({
			parentDomain: getContentForMetaTagName(tags, 'yl:parent_domain'),
			hostDomain: getContentForMetaTagName(tags, 'yl:host_domain')
		}));

		// ensure all domains are present in themes map
		const parentDomains = themesMap.map(({ parentDomain }) => parentDomain);

		ylTagPairs.forEach(({ hostDomain, parentDomain }) => {
			// check that all host domains are valid urls
			expect(() => new URL(`https://${hostDomain}`)).not.toThrow();
			// check that all parent domains are valid urls and are listed in the parentDomains array
			expect(() => new URL(`https://${parentDomain}`)).not.toThrow();
			expect(parentDomains).toContain(parentDomain);
		});

	});

	it('should have full urls for some meta tags', () => {
		metaTagsPerPage.forEach(({ tags }) => {
			const tagsContentToHaveFullUrls = ['og:url', 'twitter:url', 'og:image', 'twitter:image'].map((tagName) => getContentForMetaTagName(tags, tagName));
			tagsContentToHaveFullUrls.forEach((tagContent) => {
				expect(tagContent).toBeTruthy();
				expect(() => new URL(tagContent)).not.toThrow();
			});
		});

	});

	function getContentForMetaTagName(tags, tagName) {
		return tags
			.find((tag) => tag.includes(tagName))
			.match(/content="([^"]*)"/)[1];
	}

});

function getMetaTagsPerPage() {

	// get all html pages in the public directory and its subdirectories
	const htmlFilePaths = getHtmlFilesRecursively('./public');

	return htmlFilePaths.map((path) => ({
		path,
		tags: fs.readFileSync(path, 'utf8').match(/<meta [^>]*>/g)
	}));

	function getHtmlFilesRecursively(dir, accu = []) {
		const irrelevantDirs = ['404', '_gatsby', 'editor'];
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const name = `${dir}/${file}`;
			if (fs.statSync(name).isDirectory() && !irrelevantDirs.some((irrelevantDir) => file === irrelevantDir)) {
				getHtmlFilesRecursively(name, accu);
			} else if (name.endsWith('.html') && !name.includes('404')) {
				accu.push(name);
			}
		}
		return accu;
	}

}

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