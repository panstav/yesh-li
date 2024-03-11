import { HeadFor } from "@config/Meta";

import GoogleAnalytics from "@elements/GoogleAnalytics";
import MicrosoftClarity from "@elements/MicrosoftClarity";

export { default } from "@pages/Editor";

export const Head = HeadFor({
	title: "ניהול תוכן • יש.לי",
	mainColorHex: '00856F',
	isInternal: true,
	children: <>
		<MicrosoftClarity />
		<GoogleAnalytics />
	</>
});