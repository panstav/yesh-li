import { HeadFor } from "@config/Meta";

import About from "@themes/tom-01/Theme/pages/About";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

export default wrapPage(About);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { about: { title: pageTitle, subtitle } } } } }) => ({
	...wrapTitle(pageTitle),
	description: subtitle
})));