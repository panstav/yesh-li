const fs = require('fs');
const { Readable } = require('stream');
const path = require('path');

const dotenv = require('dotenv');
const { SitemapStream, streamToPromise } = require('sitemap');
const sass = require('sass');
const sassAlias = require('sass-alias');

const { themes: themesMap } = require('yeshli-shared');

// for some reason got doesn't like to be required regularly so we prepare a variable and require it later
let got;

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.production` });
}

const fullDomain = process.env.URL;
const shortDomain = new URL(fullDomain).hostname;

(async () => {

	if (!process.env.NETLIFY) await cleanUp();

	// get sites from api
	const { sites, redirects } = await api(`sites?domain=${shortDomain}`);

	// compile any theme-specific global styles
	await compileSass(sites);

	// check whether we're on a dedicated domain or a multi-tenant app
	if (sites.length === 1 && sites[0].slug === '') return createRootSite(sites[0]);

	// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
	// iterate through the sites array
	await createMultiSite(sites, redirects);

})();

async function createMultiSite(sites, redirects) {

	const multiName = shortDomain.replace('.', '');

	const links = (await fs.promises.readdir(`./src/domains/${multiName}`)).filter((fileName) => fileName.endsWith('.js'))
		.map((pageFileName) => {

			// avoid using index as the homepage page
			if (pageFileName === 'index.js') return { url: '/', changefreq: 'monthly', priority: 1 };

			return { url: `/${pageFileName.replace('.js', '')}`, changefreq: 'monthly', priority: 0.7 };
		})
		.concat(sites.map(site => ({ url: `/${site.slug}`, changefreq: 'daily', priority: 1 })));

	// create a redirects file for all the sites that used to be on this multi-tenant site and have since moved to their own domains
	await writeRedirectsFile(redirects);

	// create an empty file to indicate that we're not deploying a root site
	await writeRootSiteDataFile();

	return sites.reduce((accu, site) => accu.then(async () => {

		// save each site's data to a json file at /data/theme-{themeName}/{siteId}.json
		await fs.promises.mkdir(`./data/theme-${site.theme}`, { recursive: true });
		await fs.promises.writeFile(`./data/theme-${site.theme}/${site.slug}.json`, JSON.stringify(site));
		await fs.promises.mkdir(`./static/${site.slug}`, { recursive: true });
		await fs.promises.writeFile(`./static/${site.slug}/manifest.json`, JSON.stringify(getManifest(site)));

		const parentDomain = themesMap.find(({ themeName }) => themeName === sites[0].theme).parentDomain.replace('.', '');
		const { title, description, mainColorHex } = await fs.promises.readFile(`./src/components/domains/${parentDomain}/index.json`).then(JSON.parse);

		// create a manifest for the homepage as well
		await fs.promises.writeFile(`./static/manifest.json`, JSON.stringify(getManifest({
			title: `${title} • ${description}`,
			shortName: title,
			mainColor: mainColorHex,
			id: `${ multiName } - homepage`
		})));

	}), writeSitemapFile(links));
}

async function createRootSite(site) {
	// instance is running on a dedicated domain

	const siteMap = [];
	let registeredHomepage;
	Object.keys(site.content?.pages || {}).forEach((path) => {
		const effectivePath = path !== 'home' ? camelToKebabCase(path) : '';
		if (!effectivePath) registeredHomepage = true;
		return siteMap.push({ url: `/${effectivePath}`, changefreq: 'weekly', priority: effectivePath ? 0.7 : 1 });
	});

	// if the site didn't register a homepage, we'll create one for it
	if (!registeredHomepage) siteMap.push({ url: '/', changefreq: 'daily', priority: 1 });

	// create a sitemap entry per collection page and also turn the collectionPages array into an object with the collection type as the key and the collection pages array as the value
	const siteCollectionPagesSettings = themesMap.find(({ themeName }) => themeName === site.theme).collectionPages;
	site.content.collectionPages = site.content.collectionPages?.reduce((accu, page) => {
		const prefix = siteCollectionPagesSettings.find(({ type }) => type === page.type).prefix;
		const url = `${prefix}/${page.slug}`;
		siteMap.push({ url, changefreq: 'monthly', priority: 0.5 });
		if (!accu[page.type]) accu[page.type] = [];
		accu[page.type].push(page);
		return accu;
	}, {});

	await writeSitemapFile(siteMap);

	// create an empty redirects file
	await writeRedirectsFile([]);

	// save the site's data to a json file at /data/root.json
	await writeRootSiteDataFile(site);

	await fs.promises.writeFile('./static/manifest.json', JSON.stringify(getManifest(site)));
}

function getManifest({ id, title, shortName = title, slug = '', mainColor }) {
	const relativeUrl = `/${slug}`;
	return {
		"id": id,
		"name": title,
		"short_name": shortName,
		"start_url": relativeUrl,
		"display": "standalone",
		"theme_color": mainColor,
		"background_color": "#ffffff",
		"orientation": "portrait",
		"icons": [
			{
				"src": `https://storage.googleapis.com/cloudicon/${id}/favicon-32x32.png`,
				"sizes": "32x32",
				"type": "image/png"
			},
			{
				"src": `https://storage.googleapis.com/cloudicon/${id}/apple-touch-icon-144x144.png`,
				"sizes": "144x144",
				"type": "image/png"
			}
		]
	};
}

async function api(path) {
	if (!got) got = (await import('got')).got;
	return got.get(`${process.env.GATSBY_API_URL}/${path}`).json();
}

async function writeSitemapFile(items) {
	const stream = new SitemapStream({ hostname: fullDomain });
	const sitemap = await streamToPromise(Readable.from(items).pipe(stream)).then((data) => data.toString());

	return fs.promises.writeFile('./static/sitemap.xml', sitemap);
}

function writeRedirectsFile(redirects) {
	return fs.promises.writeFile('./data/redirects.json', JSON.stringify(redirects));
}

function writeRootSiteDataFile(data = {}) {
	return fs.promises.writeFile('./data/root.json', JSON.stringify(data));
}

async function compileSass(sites) {
	// array could be a single root site or multiple sites in a multi-site setup

	return Promise.all(sites.map(async (site) => {

		let result;

		// some themes don't have a global.sass file, an error will be thrown and we'll ignore it
		try {

			// the sass compiler doesn't support aliases, so we'll use sass-alias to resolve the ones we use in sass files
			const importer = sassAlias.create({
				'@styles': path.join(__dirname, '../src/styles')
			});

			// any global styles will reside in a global.sass file in the theme's components folder
			result = await sass.compileAsync(`./src/components/themes/${site.theme}/Theme/global.sass`, {
				importers: [importer],
				style: 'compressed',
				loadPaths: ['./node_modules']
			});

			// save the compiled css to the siteData object
			// the prop will be used in the Page component to inject the global styles in a way that is persistent across the pages of theme and also available to the editor preview
			site.globalStyles = result.css;

		} catch (error) {
			// ignore only the errors that are thrown when the global.sass file is missing
			if (error.message !== "no such file or directory") throw error;
		}
	}));
}

function cleanUp() {

	const paths = ['./data', './static'];

	return Promise.all(paths.map(deleteAllButGitIgnoreAt));
}

async function deleteAllButGitIgnoreAt(pathPrefix) {
	const files = await fs.promises.readdir(pathPrefix);
	return Promise.all(files.map((fileName) => {
		if (fileName === '.gitignore') return;
		return fs.promises.rm(`${pathPrefix}/${fileName}`, { recursive: true });
	}));
}

function camelToKebabCase(str) {
	return str
		// kebab casing
		.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
		// ensure dashes don't repeat
		.replace(/-+/g, '-')
		// remove dashes from start and end of the str
		.replace(/(^-|-$)/g, '');
}