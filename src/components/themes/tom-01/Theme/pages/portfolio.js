import { HeadFor } from "@config/Meta";

import parseSrcSet from "@lib/parse-srcset";

import Portfolio from "@themes/tom-01/Theme/pages/Portfolio";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getLatestPost from "@themes/tom-01/Theme/lib/get-latest-post";

export default wrapPage(Portfolio);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { portfolio: { title, subtitle } }, collectionPages: { portfolio } } } }) => {
	const featuredImage = parseSrcSet((getLatestPost(portfolio).images.find(({ isFeatured }) => isFeatured) || portfolio.find(({ images }) => images.find(({ isFeatured }) => isFeatured)).images.find(({ isFeatured }) => isFeatured)).image.srcSet);

	return ({
		...wrapTitle(title),
		description: subtitle,
		featuredImage,
	});
}));