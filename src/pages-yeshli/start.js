import { HeadFor, internalPageTitle } from "@config/Meta";
import MicrosoftClarity from "@elements/MicrosoftClarity";

export { default } from "@pages/Onboarding";

export const Head = HeadFor({
	...internalPageTitle('מתחילים'),
	mainColorHex: '00856F',
	isInternal: true,
	children: <MicrosoftClarity />
});