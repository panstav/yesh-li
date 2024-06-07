import { HeadFor } from "@config/Meta";

import getCollectionPage from "@lib/get-collection-page";
import parseSrcSet from "@lib/parse-srcset";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

import Portfolio from "./PortfolioPost";
export default wrapPage(Portfolio);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title, images } = getCollectionPage(collectionPages, pathname);
	const featuredImage = parseSrcSet((images.find(({ isFeatured }) => isFeatured) || images[0]).image.srcSet);
	return ({
		...wrapTitle(title),
		featuredImage
	});
}));