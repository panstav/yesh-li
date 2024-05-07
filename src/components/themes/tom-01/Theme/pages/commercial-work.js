import { HeadFor } from "@config/Meta";

import CommercialWork from "@themes/tom-01/Theme/pages/CommercialWork";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page-element";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

export default wrapPage(CommercialWork);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { commercialWork: { title: pageTitle, subtitle } } } } }) => ({
	...wrapTitle(pageTitle),
	description: subtitle
})));