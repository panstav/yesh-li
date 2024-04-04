import { HeadFor, internalPageTitle } from "@config/Meta";

import { featuredImage } from "@pages/Index";

import PrivacyPolicyPage, { description } from "@pages/PrivacyPolicy";
export default PrivacyPolicyPage;

export const Head = HeadFor({
	...internalPageTitle('מדיניות פרטיות'),
	description,
	featuredImage,
	hasAdvancedSeo: false
});