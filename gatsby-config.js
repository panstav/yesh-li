require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

const siteUrl = process.env.URL;
const packageJsonVersion = process.env.npm_package_version;
const isOnNetlify = process.env.NETLIFY;
const shouldAvoidBundleAnalysis = process.env.ANALYZE_BUNDLE_SIZE !== 'true';

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
				"@domains": "src/components/domains",
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
	'gatsby-plugin-catch-links',
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
	"gatsby-plugin-netlify",
	{
		resolve: 'gatsby-plugin-robots-txt',
		options: {
			sitemap: `${siteUrl}/sitemap.xml`,
			policy: [{ userAgent: '*', allow: '*' }]
		}
	}
];

const developmentOnlyPlugins = [
	{
		resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
		options: {
			disable: shouldAvoidBundleAnalysis,
			defaultSizes: "gzip"
		},
	}
];

const plugins = crossEnvPlugins.concat(isOnNetlify ? productionOnlyPlugins : developmentOnlyPlugins);

module.exports = {
	siteMetadata: {
		version: packageJsonVersion,
		siteUrl
	},
	plugins,
	trailingSlash: 'never',
	jsxRuntime: "automatic"
};