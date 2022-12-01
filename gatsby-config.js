const crossEnvPlugins = [
	{
		resolve: 'gatsby-plugin-robots-txt',
		options: {
			// sitemap: 'https://www.example.com/sitemap.xml',
			policy: [{ userAgent: '*', allow: '*' }]
		}
	},
	"gatsby-plugin-preact",
	"gatsby-plugin-netlify",
	"gatsby-plugin-react-helmet",
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
				"@data": "src/data"
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
		},
	}
];

const developmentOnlyPlugins = [];

const plugins = crossEnvPlugins.concat(process.env.NETLIFY ? productionOnlyPlugins : developmentOnlyPlugins);

module.exports = {
	siteMetadata: {
		siteUrl: 'https://yesh.li',
		title: 'יש.לי',
		description: 'יום אחד גם לך יהיה'
	},
	plugins,
	trailingSlash: 'never',
	jsxRuntime: "automatic"
};