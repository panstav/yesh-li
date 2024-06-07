import { HeadFor } from "@config/Meta";

import getCollectionPage from "@lib/get-collection-page";
import parseSrcSet from "@lib/parse-srcset";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

import Post from "./Post";
export default wrapPage(Post);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title, featuredImage: { srcSet } } = getCollectionPage(collectionPages, pathname);
	const featuredImage = parseSrcSet(srcSet);
	return ({
		...wrapTitle(title),
		featuredImage
	});
}));