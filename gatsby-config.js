const crossEnvPlugins = [
	{
		resolve: 'gatsby-plugin-robots-txt',
		options: {
			// sitemap: 'https://www.example.com/sitemap.xml',
			policy: [{ userAgent: '*', allow: '*' }]
		}
	},
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
				"@hooks": "src/hooks",
				"@styles": "src/styles",
				"@data": "src/data"
			}
		}
	}
];

const plugins = crossEnvPlugins;

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