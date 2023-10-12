const siteUrl = 'https://yesh.li';

const crossEnvPlugins = [
	"gatsby-plugin-sass",
	{
		resolve: `gatsby-plugin-alias-imports`,
		options: {
			alias: {
				"@components": "src/components",
				"@config": "src/components/config",
				"@elements": "src/components/elements",
				"@pages": "src/components/pages",
				"@themes": "src/components/themes",
				"@wrappers": "src/components/wrappers",
				"@lib": "src/lib",
				"@hooks": "src/hooks",
				"@styles": "src/styles",
				"@data": "src/data",
				"@services": "src/services"
			}
		}
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			"path": "./data"
		}
	},
	"gatsby-transformer-json",
	'gatsby-plugin-split-css'
];

const productionOnlyPlugins = [
	{
		resolve: 'gatsby-plugin-preconnect',
		options: {
			domains: [
				{ domain: 'https://storage.googleapis.com', crossOrigin: false },
			],
		},
	},
	{
		resolve: `gatsby-plugin-canonical-urls`,
		options: {
			siteUrl
		}
	},
	"gatsby-plugin-sitemap",
	"gatsby-plugin-netlify",
	{
		resolve: 'gatsby-plugin-robots-txt',
		options: {
			sitemap: `${siteUrl}/sitemap-index.xml`,
			policy: [{ userAgent: '*', allow: '*' }]
		}
	}
];

const developmentOnlyPlugins = [];

const plugins = crossEnvPlugins.concat(process.env.NETLIFY ? productionOnlyPlugins : developmentOnlyPlugins);

module.exports = {
	siteMetadata: {
		version: process.env.npm_package_version,
		siteUrl,
		title: 'יש.לי',
		description: 'יום אחד גם לך יהיה'
	},
	plugins,
	trailingSlash: 'never',
	jsxRuntime: "automatic"
};