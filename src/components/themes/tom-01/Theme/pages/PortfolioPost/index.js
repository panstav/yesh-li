import { HeadFor } from "@config/Meta";

import Portfolio from "./PortfolioPost";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getCollectionPage from "@lib/get-collection-page";

export default wrapPage(Portfolio);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title, images } = getCollectionPage(collectionPages, pathname);
	return ({
		...wrapTitle(title),
		featuredImage: images[0].image
	});
}));