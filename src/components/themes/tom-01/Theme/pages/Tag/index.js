import { HeadFor } from "@config/Meta";

import Tag from "./Tag";

import getCollectionPage from "@lib/get-collection-page";
import parseSrcSet from "@lib/parse-srcset";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getPostsByTag from "@themes/tom-01/Theme/lib/get-posts-by-tag";
import { sortByDate } from "@themes/tom-01/Theme/lib/get-latest-post";

export default wrapPage(Tag);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title } = getCollectionPage(collectionPages, pathname);
	const postsWithTag = getPostsByTag(collectionPages.post, { title });
	const featuredImage = parseSrcSet(sortByDate(postsWithTag).find(({ featuredImage }) => featuredImage.srcSet).featuredImage.srcSet);

	return ({
		...wrapTitle(title),
		featuredImage
	});
}));