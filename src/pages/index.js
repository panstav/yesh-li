import { HeadFor } from "@config/Meta";

import GoogleAnalytics from "@elements/GoogleAnalytics";
import MicrosoftClarity from "@elements/MicrosoftClarity";

import "@fontsource/assistant";

export { default } from "@pages/Index";

export const Head = HeadFor({
	title: "יש.לי • עולים לאוויר בקלות עם עמוד נחיתה מהמם שנותן ביצועים",
	description: "פיתרון איכותי לשדרוג הנוכחות ברשת, מבלי ללמוד את הפרטים הטכניים של אתר אינטרנט, תהליך שלוקח שנים לאנשי המקצוע. המערכת מציעה פיתרון נוח, יעיל ומיידי שמאפשר לך להתקדם בפיתוח העסקי.",
	featuredImage: "https://storage.googleapis.com/yeshli-www/assets/yeshli-home-featured-02.png",
	mainColorHex: '00d1b2',
	hasAdvancedSeo: false,
	children: <>
		<GoogleAnalytics />
		<MicrosoftClarity />
	</>
});