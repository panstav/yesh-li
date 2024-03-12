const fs = require('fs');

exports.onCreateWebpackConfig = ({ actions }) => {
	if (process.env.NETLIFY) {
		// We're building in production - turn off source maps
		actions.setWebpackConfig({
			devtool: false
		});
	}
};

exports.createPages = async ({ actions }) => {

	// at the package root folder, there's a data folder and inside it, if there's a root.json file, we'll use it as the root page
	const rootSiteFilePath = `${__dirname}/data/root.json`;

	cleanPagesDirectory();
	copyGlobalPages();

	if (fs.existsSync(rootSiteFilePath)) {
		createRootSite();
	} else {
		createMultiSite();
		createLegacySites();
	}

	function createMultiSite () {

		// we're on a multi-tenant site, so we'll create its pages along with the global ones
		// gatsby will do the heavy lifting, we just choose the specific multiSite
		fs.readdirSync(`./src/pages-yeshli`).forEach((file) => {
			fs.copyFileSync(`./src/pages-yeshli/${file}`, `./src/pages/${file}`);
		});

		// instance is running as a multi-tenant app, we'll create a page for each tenant using the tenant's theme
		const sitesDirectory = `${__dirname}/data`;

		// get all directories from the data folder
		const themesWithSites = fs.readdirSync(sitesDirectory, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

		// for each directory, get all the sites which are json files in the theme's directory
		themesWithSites.forEach((themeName) => {
			const themeDirectory = `${sitesDirectory}/${themeName}`;

			// for each site, create a page
			fs.readdirSync(themeDirectory).forEach((siteName) => {
				const siteData = JSON.parse(fs.readFileSync(`${themeDirectory}/${siteName}`));

				let themeComponent;
				try {
					themeComponent = siteData.redirect
						// some sites moved out to their own domains, we'll use a component that redirects them to their new domain
						? require.resolve(`${__dirname}/src/components/templates/redirect-to-root/index.js`)
						// otherwise, we'll use the theme's component
						: require.resolve(`${__dirname}/src/themes/${siteData.theme}.js`);

					// create the page for this site using the theme's component and the site's data as it's pageContext prop
					actions.createPage({
						path: `/${siteData.slug}`,
						component: themeComponent,
						context: siteData
					});

				} catch (err) {
					console.error(`Error creating page for ${siteData.slug} using theme ${siteData.theme}`, err);

				}

			});
		});
	}

	function copyGlobalPages() {
		fs.readdirSync(`./src/pages-shared`).forEach((file) => {
			fs.copyFileSync(`./src/pages-shared/${file}`, `./src/pages/${file}`);
		});
	}

	function createRootSite () {
		// instance is running on a dedicated domain, the root page is the only page

		const siteData = JSON.parse(fs.readFileSync(rootSiteFilePath));

		// create the root page
		actions.createPage({
			path: '/',
			component: require.resolve(`${__dirname}/src/themes/${siteData.theme}.js`),
			context: siteData
		});
	}

	function createLegacySites () {
		actions.createPage({
			path: '/from-junk-to-magic',
			component: require.resolve(`${__dirname}/src/components/pages/FromJunkToMagic/index.js`)
		});
	}

};

function cleanPagesDirectory() {

	// remove all files from the pages directory
	fs.readdirSync(`./src/pages`).forEach((file) => {
		// don't delete .gitignore file
		if (file === '.gitignore') return;

		// delete all other files
		fs.unlinkSync(`./src/pages/${file}`);
	});
}