import { HeadFor } from "@config/Meta";

import ShortFilms from "@themes/tom-01/Theme/pages/ShortFilms";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page";
import wrapHeadProps, { wrapTitle } from "@themes/tom-01/Theme/lib/wrap-head-props";

export default wrapPage(ShortFilms);

export const Head = HeadFor(wrapHeadProps(({ pageContext: { content: { pages: { shortFilms: { title: pageTitle, subtitle } } } } }) => ({
	...wrapTitle(pageTitle),
	description: subtitle
})));