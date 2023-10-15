const fs = require('fs');

const dotenv = require('dotenv');
const qrcode = require('qrcode');
const { parse } = require('svg-parser');

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.production` });
}

(async () => {

	// if not in production - exit
	if (!process.env.NETLIFY) return;

	// got doesn't like to be `require`d
	const got = (await import('got')).got;

	const fullDomain = process.env.URL;
	const domain = fullDomain.substring(8);

	// get sites from api
	const { sites } = await got.get(`${process.env.GATSBY_API_URL}/sites?domain=${domain}`).json();

	// check whether we're on a dedicated domain or a multi-tenant app
	if (sites.length === 1 && sites[0].slug === '') {
		// instance is running on a dedicated domain, the root page is the only page

		const site = sites[0];
		site.qrSvgPath = await urlToQrSvgPath(fullDomain);

		// save the site's data to a json file at /data/root.json
		await fs.promises.writeFile('./data/root.json', JSON.stringify(sites[0]));
		return;
	}

	// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
	// iterate through the sites array
	await sites.reduce((accu, site) => accu.then(async () => {

		site.qrSvgPath = await urlToQrSvgPath(`${fullDomain}/${site.slug}`);

		// save each site's data to a json file at /data/theme-{themeName}/{siteId}.json
		await fs.promises.mkdir(`./data/theme-${site.theme}`, { recursive: true });
		await fs.promises.writeFile(`./data/theme-${site.theme}/${site.slug}.json`, JSON.stringify(site));
	}), Promise.resolve());
})();

async function urlToQrSvgPath(url) {
	const qrSvg = await qrcode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0 });
	const parsed = parse(qrSvg);

	return parsed?.children?.[0]?.children?.[1]?.properties?.d;
}