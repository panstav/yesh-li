const fs = require('fs');

const isOnNetlify = process.env.NETLIFY;
const shortDomain = new URL(process.env.URL).hostname;

exports.onCreateWebpackConfig = ({ actions }) => {
	if (isOnNetlify) {
		// We're building in production - turn off source maps
		actions.setWebpackConfig({
			devtool: false
		});
	}
};

exports.createPages = async ({ actions }) => {

	// at the package root folder, there's a data folder and inside it, if there's a root.json file, we'll use it as the root page
	const rootSiteFilePath = `${__dirname}/data/root.json`;

	if (fs.existsSync(rootSiteFilePath)) {
		createRootSite();
	} else {
		createMultiSite();
		createLegacySites();
	}

	function createMultiSite () {

		const multiName = shortDomain.replace('.', '');

		createCustomPages();

		// create redirects for all the sites that used to be on this multi-tenant site and have since moved to their own domains
		const redirectsData = JSON.parse(fs.readFileSync(`${__dirname}/data/redirects.json`));
		redirectsData.forEach(({ oldSlug, newDomain }) => {
			actions.createRedirect({
				fromPath: `/${oldSlug}`,
				toPath: `https://${newDomain}`
			});
		});

		// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
		const sitesDirectory = `${__dirname}/data`;

		// get all directories from the data folder
		const themesWithSites = fs.readdirSync(sitesDirectory, { withFileTypes: true })
			.filter(directory => directory.isDirectory())
			.map(directory => directory.name);

		// for each directory, get all the sites which are json files in the theme's directory
		themesWithSites.forEach((themeName) => {
			const themeDirectory = `${sitesDirectory}/${themeName}`;

			// for each site, create a page
			fs.readdirSync(themeDirectory).forEach((siteName) => {
				const siteData = JSON.parse(fs.readFileSync(`${themeDirectory}/${siteName}`));

				// do not throw on creating pages, just log the error
				try {

					// we might have a got data about sites that don't have a theme yet, that's a dev/prod issue, ignore these sites
					const componentPath = `${__dirname}/src/components/themes/${siteData.theme}/index.js`;
					if (!fs.existsSync(componentPath)) return;

					// create the page for this site using the theme's component and the site's data as it's pageContext prop
					actions.createPage({
						path: `/${siteData.slug}`,
						component: componentPath,
						context: siteData
					});

				} catch (err) {
					console.error(`Error creating page for ${siteData.slug} using theme ${siteData.theme}`, err);
				}

			});
		});

		function createCustomPages () {

			const multiDir = `${__dirname}/src/domains/${multiName}`;

			// some domains don't even have a custom pages directory - we'll skip them
			if (!fs.existsSync(multiDir)) return;

			// we're on a multi-tenant site, so we'll create its pages along with the global ones
			fs.readdirSync(multiDir).forEach((fileName) => {
				if (!fileName.endsWith('.js')) return;

				const domainData = JSON.parse(fs.readFileSync(`${__dirname}/src/components/domains/${multiName}/index.json`));

				// derive path from fileName, except for the homepage, who's path is always "/"
				const path = fileName == 'index.js' ? '/' : fileName.split('.')[0];
				actions.createPage({
					path,
					component: `${multiDir}/${fileName}`,
					context: {
						...domainData,
						parentDomain: multiName
					}
				});
			});
		}

	}

	function createRootSite () {
		// instance is running on a dedicated domain

		// get homepage
		const siteData = JSON.parse(fs.readFileSync(rootSiteFilePath))[0];
		const themesMap = JSON.parse(fs.readFileSync(`${__dirname}/src/components/themes/map.json`));

		// get the editor with which he created the site and prep it for generation
		const parentDomain = themesMap.find(({ themeName }) => themeName === siteData.theme).parentDomain.replace('.', '');
		const domainData = JSON.parse(fs.readFileSync(`./src/components/domains/${parentDomain}/index.json`));

		// create the editor page
		actions.createPage({
			path: '/editor',
			component: `${__dirname}/src/components/domains/${parentDomain}/Editor.js`,
			context: {
				...domainData,
				...siteData,
				parentDomain
			}
		});

		// create the root page
		actions.createPage({
			path: '/',
			component: `${__dirname}/src/components/themes/${siteData.theme}/index.js`,
			context: { parentDomain, ...siteData }
		});
	}

	function createLegacySites () {
		actions.createPage({
			path: '/from-junk-to-magic',
			component: require.resolve(`${__dirname}/src/components/pages/FromJunkToMagic/index.js`)
		});
	}

};