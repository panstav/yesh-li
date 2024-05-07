import { HeadFor } from "@config/Meta";

import Contact from "@themes/tom-01/Theme/pages/Contact";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page-element";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

export default wrapPage(Contact);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { contact: { title: pageTitle, subtitle } } } } }) => ({
	...wrapTitle(pageTitle),
	description: subtitle
})));