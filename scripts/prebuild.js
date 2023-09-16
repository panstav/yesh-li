const fs = require('fs');
const dotenv = require('dotenv');

if (!process.env.GATSBY_API_URL) {
	dotenv.config({ path: `.env.development` });
}

(async () => {

	// got doesn't like to be `require`d
	const got = (await import('got')).got;

	const domain = process.env.URL.substring(8);

	// get sites from api
	const { sites } = await got.get(`${process.env.GATSBY_API_URL}/sites?domain=${domain}`).json();

	// iterate through the sites array
	await sites.reduce((accu, site) => accu.then(async () => {
		// save each site's data to a json file at /data/theme-{themeName}/{siteId}.json
		await fs.promises.mkdir(`./data/theme-${site.theme}`, { recursive: true });
		await fs.promises.writeFile(`./data/theme-${site.theme}/${site.slug}.json`, JSON.stringify(site));
	}), Promise.resolve());
})();