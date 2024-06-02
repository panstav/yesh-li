import { HeadFor } from "@config/Meta";

import Portfolio from "@themes/tom-01/Theme/pages/Portfolio";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";
import getLatestPost from "@themes/tom-01/Theme/lib/get-latest-post";

export default wrapPage(Portfolio);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { portfolio: { title, subtitle } }, collectionPages: { portfolio } } } }) => {
	return ({
		...wrapTitle(title),
		description: subtitle,
		featuredImage: getLatestPost(portfolio).images[0],
	});
}));