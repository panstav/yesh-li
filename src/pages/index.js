import { HeadFor } from "@config/Meta";

import GoogleAnalytics from "@elements/GoogleAnalytics";
import MicrosoftClarity from "@elements/MicrosoftClarity";

import "@fontsource/assistant/hebrew-400.css";
import assistantFont from "@fontsource/assistant/files/assistant-hebrew-400-normal.woff2";

import IndexPage, { topImageSrc } from "@pages/Index";
export default IndexPage;

export const Head = HeadFor({
	preload: [{ href: topImageSrc.small, as: 'image' }, { href: topImageSrc.regular, as: 'image' },
		{ href: assistantFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }],
	title: "יש.לי • עולים לאוויר בקלות עם עמוד נחיתה מהמם שנותן ביצועים",
	description: "פיתרון איכותי לשדרוג הנוכחות ברשת, מבלי ללמוד את הפרטים הטכניים של אתר אינטרנט, תהליך שלוקח שנים לאנשי המקצוע. המערכת מציעה פיתרון נוח, יעיל ומיידי שמאפשר לך להתקדם בפיתוח העסקי.",
	featuredImage: "https://storage.googleapis.com/yeshli-www/assets/yeshli-home-featured-02.png",
	mainColorHex: '00856F',
	hasAdvancedSeo: false,
	children: <>
		<GoogleAnalytics />
		<MicrosoftClarity />
	</>
});