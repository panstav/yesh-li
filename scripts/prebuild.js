const fs = require('fs');
const { Readable } = require('stream');

const { SitemapStream, streamToPromise } = require('sitemap');
const dotenv = require('dotenv');

const themesMap = require('../src/components/themes/map.json');

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.production` });
}

const fullDomain = process.env.URL;
const shortDomain = new URL(fullDomain).hostname;

(async () => {

	if (!process.env.NETLIFY) await cleanUp();

	// get sites from api
	const { sites, redirects } = await getUserSites();

	// check whether we're on a dedicated domain or a multi-tenant app
	if (sites.length === 1 && sites[0].slug === '') return scaffoldRootSite(sites);

	// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
	// iterate through the sites array
	await scaffoldMultiSite(sites, redirects);

})();

async function getUserSites() {

	// got doesn't like to be `require`d
	const got = await getGot();

	return got.get(`${process.env.GATSBY_API_URL}/sites?domain=${shortDomain}`).json();
}

async function scaffoldMultiSite(sites, redirects) {

	const multiName = shortDomain.replace('.', '');

	const links = (await fs.promises.readdir(`./src/domains/${multiName}`)).filter((fileName) => fileName.endsWith('.js'))
		.map((pageFileName) => {

			// avoid using index as the homepage page
			if (pageFileName === 'index.js') return { url: '/', changefreq: 'monthly', priority: 1 };

			return { url: `/${pageFileName.replace('.js', '')}`, changefreq: 'monthly', priority: 0.7 };
		})
		.concat(sites.map(site => ({ url: `/${site.slug}`, changefreq: 'daily', priority: 1 })));

	// create a redirects file for all the sites that used to be on this multi-tenant site and have since moved to their own domains
	await createRedirects(redirects);

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
			id: `${ multiName } - homepage`,
			slug: ''
		})));

		// create an empty file to indicate that we're not deploying a root site
		return writeRootSiteDataFile();

	}), createSitemap(links));
}

async function scaffoldRootSite(site) {
	// instance is running on a dedicated domain, the root page is the only page

	await createSitemap([
		{ url: '/', changefreq: 'daily', priority: 1 }
	]);

	// create an empty redirects file
	await createRedirects([]);

	// save the site's data to a json file at /data/root.json

	await writeRootSiteDataFile(site);
	await fs.promises.writeFile('./static/manifest.json', JSON.stringify(getManifest(site)));
}

function getManifest({ title, shortName = title, slug, id = slug, mainColor }) {
	const relativeUrl = `/${slug}`;
	const pageShortUrl = `${ shortDomain }${ slug ? relativeUrl : ''}`;
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
				"src": `https://storage.googleapis.com/cloudicon/${pageShortUrl}/favicon-32x32.png`,
				"sizes": "32x32",
				"type": "image/png"
			},
			{
				"src": `https://storage.googleapis.com/cloudicon/${pageShortUrl}/apple-touch-icon-144x144.png`,
				"sizes": "144x144",
				"type": "image/png"
			}
		]
	};
}

async function getGot() {
	return (await import('got')).got;
}

async function createSitemap(items) {
	const stream = new SitemapStream({ hostname: fullDomain });
	const sitemap = await streamToPromise(Readable.from(items).pipe(stream)).then((data) => data.toString());

	return fs.promises.writeFile('./static/sitemap.xml', sitemap);
}

function createRedirects(redirects) {
	return fs.promises.writeFile('./data/redirects.json', JSON.stringify(redirects));
}

function writeRootSiteDataFile(data = []) {
	return fs.promises.writeFile('./data/root.json', JSON.stringify(data));
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