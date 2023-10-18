const fs = require('fs');

const dotenv = require('dotenv');
const qrcode = require('qrcode');
const { parse } = require('svg-parser');

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.production` });
}

const fullDomain = process.env.URL;

(async () => {

	// if not in production - exit
	// if (!process.env.NETLIFY) return;

	// got doesn't like to be `require`d
	const got = (await import('got')).got;

	// get sites from api
	const { sites } = await got.get(`${process.env.GATSBY_API_URL}/sites?domain=${fullDomain.substring(8)}`).json();

	// check whether we're on a dedicated domain or a multi-tenant app
	if (sites.length === 1 && sites[0].slug === '') {
		await saveRootSite();
		return;
	}

	// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
	// iterate through the sites array
	await saveAllSites();

	async function saveRootSite () {
		// instance is running on a dedicated domain, the root page is the only page

		const site = sites[0];
		site.qrSvgPath = await urlToQrSvgPath(fullDomain);

		// save the site's data to a json file at /data/root.json
		await fs.promises.writeFile('./data/root.json', JSON.stringify(sites[0]));
		await fs.promises.writeFile('./static/manifest.json', JSON.stringify(getManifest(site)));
	}

	function saveAllSites() {
		return sites.reduce((accu, site) => accu.then(async () => {

			site.qrSvgPath = await urlToQrSvgPath(`${fullDomain}/${site.slug}`);

			// save each site's data to a json file at /data/theme-{themeName}/{siteId}.json
			await fs.promises.mkdir(`./data/theme-${site.theme}`, { recursive: true });
			await fs.promises.writeFile(`./data/theme-${site.theme}/${site.slug}.json`, JSON.stringify(site));
			await fs.promises.mkdir(`./static/${site.slug}`, { recursive: true });
			await fs.promises.writeFile(`./static/${site.slug}/manifest.json`, JSON.stringify(getManifest(site)));
		}), Promise.resolve());
	}

})();

async function urlToQrSvgPath(url) {
	const qrSvg = await qrcode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0 });
	const parsed = parse(qrSvg);

	return parsed?.children?.[0]?.children?.[1]?.properties?.d;
}

function getManifest({ title, slug, mainColor }) {
	const pageShortUrl = `${fullDomain}${slug ? `/${slug}` : ''}`.slice(fullDomain.indexOf('://') + 3);
	return {
		"id": slug,
		"name": title,
		"short_name": title,
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
				"src": `https://storage.googleapis.com/cloudicon/${pageShortUrl}/apple-touch-icon-114x114.png`,
				"sizes": "32x32",
				"type": "image/png"
			}
		]
	};
}