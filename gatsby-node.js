const fs = require('fs');

let themesMap;

const isOnNetlify = process.env.NETLIFY;
const shortDomain = new URL(process.env.URL).hostname;

exports.onCreateWebpackConfig = ({ actions }) => {
	// if we're building in production - turn off source maps
	if (isOnNetlify) actions.setWebpackConfig({
		devtool: false
	});
};

exports.createPages = createPages;

exports.onCreateWebpackConfig = onCreateWebpackConfig;

function onCreateWebpackConfig({ getConfig, actions }) {
	const config = getConfig();

	silenceOrderWarning();

	// Update the config.
	actions.replaceWebpackConfig(config);

	function silenceOrderWarning() {
		// Get the mini-css-extract-plugin
		const miniCssExtractPlugin = config.plugins.find(
			(plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
		);

		// Set the option here to true.
		if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true;
	}
}

async function createPages({ actions }) {

	await fetchThemesMap();

	const themeCustomPages = [];

	// at the package root folder, there's a data folder and inside it, if there's a root.json file, we'll use it as the root page
	const rootSiteFilePath = `${__dirname}/data/root.json`;
	const rootSiteData = safelyReadFile(rootSiteFilePath);

	if (rootSiteData) {
		createRootSite();

	} else {
		createMultiSite();
		createLegacySites();
	}

	function createMultiSite() {

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

				createThemePages(siteData);
			});
		});

		function createCustomPages() {

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

	function createRootSite() {
		// instance is running on a dedicated domain

		const themeData = themesMap.find(({ themeName }) => themeName === rootSiteData.theme);

		// get the editor with which he created the site and prep it for generation
		const parentDomain = themeData.parentDomain.replace('.', '');
		const domainData = JSON.parse(fs.readFileSync(`./src/components/domains/${parentDomain}/index.json`));

		// create the editor page
		actions.createPage({
			path: '/editor',
			component: `${__dirname}/src/components/domains/${parentDomain}/Editor.js`,
			context: {
				...domainData,
				...rootSiteData,
				parentDomain
			}
		});

		const context = { ...rootSiteData, parentDomain };
		createThemePages(rootSiteData, context);

		if (themeCustomPages.length) {
			fs.writeFileSync(rootSiteFilePath, JSON.stringify([{ ...rootSiteData, customPages: themeCustomPages }]));
		}

		// create a page for each collection page in the site's data
		if (rootSiteData.content.collectionPages) {
			Object.keys(rootSiteData.content.collectionPages).forEach((type) => {
				rootSiteData.content.collectionPages[type].forEach((page) => {
					const { componentPath, prefix } = themeData.collectionPages.find((pageTypeData) => type === pageTypeData.type);
					const key = `${prefix}/${page.slug}`;

					return createThemePage({
						theme: rootSiteData.theme,
						path: `/${key}`,
						context,
						key,
						componentPath
					});
				});
			});
		}
	}

	function createThemePages(siteData, context = siteData) {

		const { theme, slug } = siteData;
		const innerPagesPath = `${__dirname}/src/components/themes/${theme}/Theme/pages`;

		if (!fs.existsSync(innerPagesPath)) {
			// the theme doesn't have a pages directory, we'll treat it as a single page site
			return createThemePage({
				theme,
				context,
				componentPath: `index.js`,
				path: `/${slug}`
			});
		}

		// create a page for each file in the pages directory
		fs.readdirSync(innerPagesPath).forEach((fileName) => {
			if (!fileName.endsWith('.js')) return;

			const pathPrefix = slug ? `/${slug}/` : '/';
			const path = fileName == 'index.js' ? pathPrefix : `${pathPrefix}${fileName.split('.')[0]}`;
			createThemePage({
				theme,
				path,
				context,
				key: fileName.split('.')[0],
				componentPath: `pages/${fileName}`
			});
		});
	}

	function createThemePage({ key, theme, componentPath, path, context }) {
		// do not throw on creating pages, just log the error
		try {

			// we might have a got data about sites that don't have a theme yet, that's a dev/prod issue, ignore these sites
			const componentFullPath = `${__dirname}/src/components/themes/${theme}/Theme/${componentPath}`;
			if (!fs.existsSync(componentFullPath)) return;

			// create the page for this site using the theme's component and the site's data as it's pageContext prop
			actions.createPage({
				path,
				context,
				component: componentFullPath,
			});

			// add pages to a map that will be used by Editor->Preview to navigate between pages
			// homepage is already taken care of so ignore it
			if (key && path !== '/') themeCustomPages.push({
				key,
				theme,
				path: componentPath
			});

		} catch (err) {
			console.error(`Error creating page for ${path} using theme ${theme}`, err);
		}
	}

	function createLegacySites() {
		const slug = 'from-junk-to-magic';
		actions.createPage({
			path: `/${slug}`,
			component: require.resolve(`${__dirname}/src/components/pages/FromJunkToMagic/index.js`),
			context: {
				parentDomain: 'yesh.li',
				slug
			}
		});
	}

}

function safelyReadFile (path) {
	try {
		return JSON.parse(fs.readFileSync(path));
	} catch (err) {
		return null;
	}
}

async function fetchThemesMap() {
	const { themes } = await import('yeshli-shared');
	themesMap = themes;
}