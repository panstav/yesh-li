import { HeadFor } from "@config/Meta";

import { featuredImage } from "@pages/Index";

import TermsOfUsePage from "@pages/TermsOfUse";
export default TermsOfUsePage;

export const Head = HeadFor({
	title: "יש.לי • תנאי שימוש",
	featuredImage,
	hasAdvancedSeo: false
});