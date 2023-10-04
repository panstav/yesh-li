exports.onCreateWebpackConfig = ({ actions }) => {
	if (process.env.NETLIFY) {
		// We're building in production - turn off source maps
		actions.setWebpackConfig({
			devtool: false
		});
	}
};