import { HeadFor } from "@config/Meta";

import { featuredImage } from "@pages/Index";

import PrivacyPolicyPage, { description } from "@pages/PrivacyPolicy";
export default PrivacyPolicyPage;

export const Head = HeadFor({
	title: "יש.לי • מדיניות פרטיות",
	description,
	featuredImage,
	hasAdvancedSeo: false
});