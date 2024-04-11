import { HeadFor } from "@config/Meta";

import "@fontsource/assistant/hebrew-400.css";
import assistantFont from "@fontsource/assistant/files/assistant-hebrew-400-normal.woff2";

import { domainProps, wrapTitle } from "@domains/yeshli";

export default HeadFor({
	preload: [{ href: domainProps.topImageSrc.small, as: 'image' }, { href: domainProps.topImageSrc.regular, as: 'image' }, { href: assistantFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }],

	...domainProps,
	...wrapTitle(domainProps.title),
	description: "פיתרון איכותי לשדרוג הנוכחות ברשת, מבלי ללמוד את הפרטים הטכניים של אתר אינטרנט, תהליך שלוקח שנים לאנשי המקצוע. המערכת מציעה פיתרון נוח, יעיל ומיידי שמאפשר לך להתקדם בפיתוח העסקי.",
});