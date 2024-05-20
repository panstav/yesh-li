import { HeadFor } from "@config/Meta";

import Post from "./Post";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getCollectionPage from "@lib/get-collection-page";

export default wrapPage(Post);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title, featuredImage } = getCollectionPage(collectionPages, pathname);
	return ({
		...wrapTitle(title),
		featuredImage
	});
}));