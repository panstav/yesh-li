import { HeadFor } from "@config/Meta";
import MicrosoftClarity from "@elements/MicrosoftClarity";

export { default } from "@pages/Onboarding";

export const Head = HeadFor({
	title: "מתחילים • יש.לי",
	mainColorHex: '00d1b2',
	isInternal: true,
	children: <MicrosoftClarity />
});