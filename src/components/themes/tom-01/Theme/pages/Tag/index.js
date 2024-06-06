import { HeadFor } from "@config/Meta";

import Tag from "./Tag";

import getCollectionPage from "@lib/get-collection-page";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getLatestPost from "@themes/tom-01/Theme/lib/get-latest-post";
import getPostsByTag from "@themes/tom-01/Theme/lib/get-posts-by-tag";

export default wrapPage(Tag);

export const Head = HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const { title } = getCollectionPage(collectionPages, pathname);
	const postsWithTag = getPostsByTag(collectionPages.post, { title });

	return ({
		...wrapTitle(title),
		featuredImage: getLatestPost(postsWithTag).featuredImage
	});
}));