import { HeadFor } from "@config/Meta";
import MicrosoftClarity from "@elements/MicrosoftClarity";

export { default } from "@pages/Editor";

export const Head = HeadFor({
	title: "ניהול תוכן • יש.לי",
	mainColorHex: '00d1b2',
	children: <MicrosoftClarity />
});