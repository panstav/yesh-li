const fs = require('fs');

const dotenv = require('dotenv');

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.production` });
}

const fullDomain = process.env.URL;

(async () => {

	// if not in production - exit
	if (!process.env.NETLIFY) return;

	// got doesn't like to be `require`d
	const got = await getGot();

	// get sites from api
	const { sites } = await getAllSites();

	// check whether we're on a dedicated domain or a multi-tenant app
	if (sites.length === 1 && sites[0].slug === '') return await saveRootSite(sites);

	// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
	// iterate through the sites array
	await saveAllSites(sites);

	function getAllSites() {
		return got.get(`${process.env.GATSBY_API_URL}/sites?domain=${fullDomain.substring(8)}`).json();
	}

})();

function saveAllSites(sites) {
	return sites.reduce((accu, site) => accu.then(async () => {

		// save each site's data to a json file at /data/theme-{themeName}/{siteId}.json
		await fs.promises.mkdir(`./data/theme-${site.theme}`, { recursive: true });
		await fs.promises.writeFile(`./data/theme-${site.theme}/${site.slug}.json`, JSON.stringify(site));
		await fs.promises.mkdir(`./static/${site.slug}`, { recursive: true });
		await fs.promises.writeFile(`./static/${site.slug}/manifest.json`, JSON.stringify(getManifest(site)));

		// create a manifest for the homepage as well
		await fs.promises.writeFile(`./static/manifest.json`, JSON.stringify(getManifest({
			title: "יש.לי • עולים לאוויר בקלות עם עמוד נחיתה מהמם שנותן ביצועים",
			shortName: "יש.לי",
			mainColor: '#00856F',
			id: 'yeshli-homepage',
			slug: ''
		})));

	}), Promise.resolve());
}

async function saveRootSite(sites) {
	// instance is running on a dedicated domain, the root page is the only page

	const site = sites[0];

	// save the site's data to a json file at /data/root.json
	await fs.promises.writeFile('./data/root.json', JSON.stringify(sites[0]));
	await fs.promises.writeFile('./static/manifest.json', JSON.stringify(getManifest(site)));
}

function getManifest({ title, shortName = title, slug, id = slug, mainColor }) {
	const pageShortUrl = `${fullDomain}${slug ? `/${slug}` : ''}`.slice(fullDomain.indexOf('://') + 3);
	return {
		"id": id,
		"name": title,
		"short_name": shortName,
		"start_url": `/${slug}`,
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