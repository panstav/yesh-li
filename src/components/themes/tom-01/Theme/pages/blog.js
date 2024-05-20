import { HeadFor } from "@config/Meta";

import Blog from "@themes/tom-01/Theme/pages/Blog";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getLatestPost from "@themes/tom-01/Theme/lib/get-latest-post";

export default wrapPage(Blog);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { blog: { title: pageTitle, subtitle } }, collectionPages: { post: posts } } } }) => ({
	...wrapTitle(pageTitle),
	description: subtitle,
	featuredImage: getLatestPost(posts).featuredImage,
})));