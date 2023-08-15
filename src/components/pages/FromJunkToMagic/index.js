import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import { Hero, Description, Delimiter, Guides, Signup, Footer, Gallery } from "@shared/shila";
import { PageContext } from "@shared/shila/contexts";

import Details from './Details';

import slides from './_data/slides';
import guides from './_data/guides';

RetreatYetziraVeOtzmaPage.config = {
	isSoldOut: false,
	title: 'FROM JUNK TO MAGIC בערבה',
	dates: '23-25.11.23',
	description: 'ריטריט יצירה 	בחומרים נטושים וחומרי טבע מהמדבר. חוויה שמכוונת עמוק פנימה ומוציאה לאור, בעדינות, את היופי הגולמי שבתוכנו.',
	background: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg',
	emailAddress: 'ksamardigital@gmail.com',
	featuredImage: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg'
};

export default function RetreatYetziraVeOtzmaPage() {
	return <PageContext.Provider value={RetreatYetziraVeOtzmaPage.config}>
		<Hero />
		<Description>
			<DescriptionContent />
		</Description>
		<Delimiter height={100} />
		<Guides title="על שילה ואיילת:">{guides}</Guides>
		<Section withTopMargin={false} className="mt-3">
			<Gallery>{slides}</Gallery>
		</Section>
		<Delimiter height={100} />
		<Section className="is-medium">
			<GlassBox>
				<Signup />
			</GlassBox>
		</Section>
		<Delimiter height={100} />
		<Section>
			<Details />
		</Section>
		<Footer />
	</PageContext.Provider>;
}

function DescriptionContent() {
	return <>
		<p>כשאנחנו מרגישים שעברנו כל כך הרבה בתקופה כה קצרה, כאשר יש עמימות, כעס וחוסר וודאות, זה הזמן בו אנו זקוקות ליהלומים שבנו.</p>
		<p>היהלומים שאנו דולות ממעמקינו ומוציאות לאור השמש הם גולמיים, בלתי עשויים ולא מלוטשים ולכן יפהפיים.</p>
		<p>ממש בקרוב, כשיצטנן מעט, ניפגש בקיבוץ סמר, לריטריט יצירה בחומרים נטושים וחומרי טבע מהמדבר. חוויה שמכוונת עמוק פנימה ומוציאה לאור, בעדינות, את היופי הגולמי שבתוכנו.</p>
		<p>גם הפעם נצא לסיור ליקוט בג&apos;נקיה מהיפות בארץ, נשתאה ממטע התמרים הוותיקים, שם נלמד על הוואבי סאבי, על היופי שבעתיק, הקמל, העמום והמשופשף.</p>
		<p>נלמד משילה טכניקות יצירה שונות וביחד, נתחבר לפשטות ולשמחה שבנו לצד התכנסות והתמלאות פנימית.</p>
		<p>נתכנס עם איילת לטעימה מרתקת של התבוננות בתמונות וסיפורים אשר נאצרו בתוכנו. נסייר בקיבוץ סמר, קהילה צבעונית של יצירה ואמנות.</p>
		<p>בסמר נאצרו במשך שנים רבות חומרים משומשים מסוגים וממקורות שונים שנועדו להשראה ולשימוש חוזר.</p>
		<p>נערוך בג&apos;נקיה סיור ליקוט והשראה.</p>
		<p>נסייר ונלקט גם במטע התמרים האורגני של הקיבוץ ונתבשם בטעימות הסילאן המקומי.</p>
		<p>שעות היצירה יתקיימו בסטודיו בסמר, הלינה תהיה בחדרים נוחים ונעימים בקיבוץ השכן, אליפז.</p>
		<p>לאורך הרטריט, בהיפתחנו לעולם פנימי חדש, תלווה אותנו מחברת שתהווה יומן מסע תומך לימים המיוחדים שנעבור.</p>
		<p>במשך כל הרטריט תהיו בידינו הטובות והאוהבות, העברנו יחדיו ריטריטים רבים ואנחנו מנוסות ומקצועיות מאד.</p>
		<p>כך כתבה אחת ממשתתפות הרטריט בינואר 2023:<br />&quot;כשאנחנו מסכימות לפשוט את המסכות, ולדומם רגע את מנוע היומיום המטרטר, אנחנו נצליח לשמוע את הלב, פועם בקצבו, מבקש מאיתנו דבר מה… זה לא משנה מה, רק שנקשיב לו. וברגע הזה של הקשבה עמוקה אנחנו מקיימות בתוכנו את המהות של וואבי סאבי, מסכימות לאהוב את עצמנו כך, להתבונן בעצמנו במבט חומל, נקי משיפוטיות ואז נגלה לעייננו יופי רב, יופי עצום!<br />וזהו יופיינו שלנו, במלוא הדרו.&quot;</p>
	</>;
}