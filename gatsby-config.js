const siteUrl = 'https://yesh.li';

const crossEnvPlugins = [
	{
		resolve: 'gatsby-plugin-robots-txt',
		options: {
			// sitemap: 'https://www.example.com/sitemap.xml',
			policy: [{ userAgent: '*', allow: '*' }]
		}
	},
	"gatsby-plugin-netlify",
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
		resolve: "gatsby-plugin-google-tagmanager",
		options: {
			id: "GTM-W2SWWXL",
			includeInDevelopment: false,
			enableWebVitalsTracking: true
		}
	},
	{
		resolve: `gatsby-plugin-canonical-urls`,
		options: {
			siteUrl
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