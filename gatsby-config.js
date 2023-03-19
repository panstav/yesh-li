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
				"@wrappers": "src/components/wrappers",
				"@lib": "src/lib",
				"@hooks": "src/hooks",
				"@styles": "src/styles",
				"@data": "src/data",
				"@shared": "src/components/shared"
			}
		}
	}
];

const productionOnlyPlugins = [
	{
		resolve: `gatsby-plugin-hotjar`,
		options: {
			id: 3283744,
			sv: 7,
		},
	},
	{
		resolve: `gatsby-plugin-google-gtag`,
		options: {
			// You can add multiple tracking ids and a pageview event will be fired for all of them.
			trackingIds: [
				"G-6S1RKXRGW7", // Google Analytics / GA
				'AW-11119409341', // Google Ads / Adwords / AW
				// "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
			],
			// This object gets passed directly to the gtag config command
			// This config will be shared across all trackingIds
			gtagConfig: {
				optimize_id: "OPT_CONTAINER_ID",
				anonymize_ip: true,
				cookie_expires: 0,
			},
			// This object is used for configuration specific to this plugin
			pluginConfig: {
				// Puts tracking script in the head instead of the body
				head: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				// exclude: ["/preview/**", "/do-not-track/me/too/"],
				// Defaults to https://www.googletagmanager.com
				// origin: "YOUR_SELF_HOSTED_ORIGIN",
				// Delays processing pageview events on route update (in milliseconds)
				delayOnRouteUpdate: 0,
			},
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
		siteUrl,
		title: 'יש.לי',
		description: 'יום אחד גם לך יהיה'
	},
	plugins,
	trailingSlash: 'never',
	jsxRuntime: "automatic"
};