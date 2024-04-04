import { HeadFor, internalPageTitle } from "@config/Meta";

import { featuredImage } from "@pages/Index";

import TermsOfUsePage from "@pages/TermsOfUse";
export default TermsOfUsePage;

export const Head = HeadFor({
	...internalPageTitle('תנאי שימוש'),
	featuredImage,
	hasAdvancedSeo: false
});