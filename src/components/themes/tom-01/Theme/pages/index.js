import { HeadFor } from "@config/Meta";

import Homepage from "@themes/tom-01/Theme/pages/Homepage";

import wrapPage from "@themes/tom-01/Theme/lib/wrap-page-element";
import wrapHeadProps from "@themes/tom-01/Theme/lib/wrap-head-props";

export default wrapPage(Homepage);

export const Head = HeadFor(wrapHeadProps());