import Meta from '@config/Meta';
import GlassBox from '@wrappers/GlassBox';
import GoogleAnalytics from '@elements/GoogleAnalytics';
import MicrosoftClarity from '@elements/MicrosoftClarity';

import { Hero, Description, Delimiter, Guides, Signup, Footer, Gallery, Section } from "./shila";
import { PageContext } from "./shila/contexts";

import Details from './Details';

import slides from './_data/slides';
import guides from './_data/guides';

const isProduction = process.env.NODE_ENV === 'production';

RetreatYetziraVeOtzmaPage.config = {
	isSoldOut: false,
	title: 'FROM JUNK TO MAGIC ריטריט יצירה עם חומרים נטושים בערבה',
	TitleComponent: () => <>FROM JUNK TO MAGIC<br />ריטריט יצירה עם חומרים נטושים<br />בערבה</>,
	dates: '4-6.1.24',
	description: 'ריטריט יצירה 	בחומרים נטושים וחומרי טבע מהמדבר. חוויה שמכוונת עמוק פנימה ומוציאה לאור, בעדינות, את היופי הגולמי שבתוכנו.',
	background: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg',
	emailAddress: 'ksamardigital@gmail.com',
	featuredImage: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg'
};

export const Head = () => {
	return <>
		<Meta
			{...RetreatYetziraVeOtzmaPage.config}
		/>
		{isProduction && <>
			<GoogleAnalytics />
			<MicrosoftClarity />
		</>}
	</>;
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
		<p>אנו מזמינות אתכם לערבה לרטריט החורף שלנו, שיקרה ממש בקרוב, בקיבוץ סמר.</p>
		<p>ניצור ביחד כדי לחזק את תחושת הבטחון והמוגנות שלנו בתוך עצמנו ועם הסובבים איתנו.</p>
		<p>ריטריט היצירה  בחומרים נטושים וחומרי טבע מהמדבר הוא חוויה שמכוונת עמוק פנימה ומוציאה לאור, בעדינות, את היופי הגולמי שבתוכנו.  ברטריט הקרוב נצא בפעם הראשונה לסיור בפארק תמנע, אוצר טבע נחושת ואדם. נסייר וניצור עם החומרים שנלקט בו. גם הפעם נצא לסיור ליקוט בג&apos;נקיה מעוררת השראה , נלמד על הוואבי סאבי, על היופי שבעתיק, הקמל, העמום והמשופשף.</p>
		<p>נלמד משילה טכניקות יצירה שונות וביחד, נתחבר לפשטות ולשמחה שבנו לצד התכנסות והתמלאות פנימית.</p>
		<p>נסייר בקיבוץ סמר, קהילה צבעונית של יצירה ואמנות ונטעם מהסילאן המקומי.</p>
		<p>שעות היצירה יתקיימו בסטודיו בסמר, הלינה תהיה בחדרים נוחים ונעימים בקיבוץ השכן, אליפז.</p>
		<p>במהלך הרטריט, בהיפתחנו לעולם פנימי חדש, תלווה אותנו מחברת שתהווה יומן מסע תומך לימים המיוחדים שנעבור.</p>
		<p>במשך כל הרטריט תהיו בידינו הטובות והאוהבות, העברנו יחדיו רטריטים רבים ואנחנו מנוסות ומקצועיות מאד.</p>
		<p>כך כתבה אחת ממשתתפות הרטריט בינואר 2023:<br />&quot;כשאנחנו מסכימות לפשוט את המסכות, ולדומם רגע את מנוע היומיום המטרטר, אנחנו נצליח לשמוע את הלב, פועם בקצבו, מבקש מאיתנו דבר מה… זה לא משנה מה, רק שנקשיב לו. וברגע הזה של הקשבה עמוקה אנחנו מקיימות בתוכנו את המהות של וואבי סאבי, מסכימות לאהוב את עצמנו כך, להתבונן בעצמנו במבט חומל, נקי משיפוטיות ואז נגלה לעייננו יופי רב, יופי עצום!<br />וזהו יופיינו שלנו, במלוא הדרו.&quot;</p>
	</>;
}