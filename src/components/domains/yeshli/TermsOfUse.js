import { HeadFor } from "@config/Meta";

import ContentPage from "@wrappers/ContentPage";

import { wrapPage, domainProps, wrapTitle } from "@domains/yeshli";
import ContactParagraph from "@domains/yeshli/elements/ContactParagraph";
import LastUpdated from "@domains/yeshli/elements/LastUpdated";

export const Head = HeadFor({
	...domainProps,
	...wrapTitle('תנאי שימוש'),
	hasAdvancedSeo: false
});

export default wrapPage(function TermsOfUse() {
	return <ContentPage>

		<LastUpdated date={new Date('2024-02-21')} />

		<h1 className="mt-0">תנאי שימוש</h1>

		<h2>זמני אספקה</h2>

		<p>יש.לי היא מערכת אוטומטית, אחד מהיתרונות של מערכת זו היא שהכל קורה באופן מיידי.</p>

		<h2>מדיניות ביטולים</h2>

		<p>במקרה של ביטול עסקה, ובהתאם לחוק הגנת הצרכן, המשתמש יהיה זכאי להחזר כספי - זאת במידה ולא עברו יותר מ-14 יום מתחילת השירות ובהפחתה של ₪50 מסכום העסקה - זאת לטובה כיסוי עלויות התקנה ועמלת החיוב וההחזר של חברת האשראי.</p>

		<ContactParagraph />

	</ContentPage>;
});