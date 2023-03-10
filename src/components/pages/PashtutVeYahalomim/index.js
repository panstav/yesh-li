import Section from "@wrappers/Section";
import GlassBox from "@wrappers/GlassBox";

import { PageContext } from "@shared/shila/contexts";

import { Hero, Description, Delimiter, Guides, WhosThisFor, Signup, Footer, Gallery } from "@shared/shila";

import Details from "./Details";

import images from './images';

PashtutVeYahalomimPage.config = {
	isSoldOut: false,
	title: 'פשטות ויהלומים רטריט אביב בערבה',
	dates: '11-13.5.23',
	description: 'יצירה בחומרים נטושים וחומרי טבע בסטודיו בלב המדבר.',
	background: 'https://storage.googleapis.com/yeshli-www/assets/background-02.jpg',
	emailAddress: 'ksamardigital@gmail.com',
	featuredImage: 'https://storage.googleapis.com/yeshli-www/assets/background-02-clear.jpg'
};

export default function PashtutVeYahalomimPage() {
	return <PageContext.Provider value={PashtutVeYahalomimPage.config}>
		<Hero />
		<Description>
			<DescriptionContent />
		</Description>
		<Delimiter height={100} />
		<Guides />
		<Section withTopMargin={false} className="mt-3">
			<WhosThisFor />
		</Section>
		<Section className="pt-6">
			<Gallery>{images}</Gallery>
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
	</PageContext.Provider>
}

function DescriptionContent() {
	return <>
		<p>כשאנחנו מרגישים שעברנו כל כך הרבה בתקופה כה קצרה, כאשר פתאום יש עמימות וחוסר וודאות, זה הזמן בו אנחנו מגלות את היהלומים שבנו, היהלומים שאנו דולות ממעמקים ומוציאות לאור השמש הם גולמיים, בלתי עשויים, לא מלוטשים ולכן יפהפיים.</p>
		<p>ממש בקרוב, ניפגש בקיבוץ סמר, לריטריט יצירה  בחומרים נטושים וחומרי טבע מהמדבר. חוויה שמכוונת עמוק פנימה ומוציאה לאור, בעדינות, את היופי הגולמי שבתוכנו.</p>
		<p>גם הפעם נצא לסיור ליקוט בג'נקיה מהיפות בארץ, נשתאה ממטע התמרים הוותיקים, שם נלמד על הוואבי סאבי, על היופי שבעתיק, הקמל, העמום והמשופשף.</p>
		<p>נלמד משילה טכניקות יצירה שונות וביחד, נתחבר לפשטות ולשמחה שבנו לצד התכנסות והתמלאות פנימית. בסמר נאצרו במשך שנים רבות חומרים משומשים מסוגים וממקורות שונים שנועדו להשראה ולשימוש חוזר. בשהותנו בסמר נזכה להכיר ולהתארח אצל מגוון אמנים מקומיים ונטעם מהתמרים והסילאן הגדלים ומיוצרים במקום. שעות היצירה יתקיימו בסטודיו בסמר, הלינה תהיה בחדרים נוחים ונעימים בקיבוץ השכן, אליפז.</p>
		<p>לאורך הרטריט, בהיפתחנו לעולם פנימי חדש, תלווה אותנו מחברת שתהווה יומן מסע תומך לימים המיוחדים שנעבור.</p>
		<p>במשך כל הרטריט תהיו בידינו הטובות והאוהבות, העברנו יחדיו רטריטים רבים ואנחנו מנוסות ומקצועיות מאד.</p>
		<p>כך כתבה אחת ממשתתפות הרטריט בינואר 2023:<br />"כשאנחנו מסכימות לפשוט את המסכות, ולדומם רגע את מנוע היומיום המטרטר, אנחנו נצליח לשמוע את הלב, פועם בקצבו, מבקש מאיתנו דבר מה… זה לא משנה מה, רק שנקשיב לו. וברגע הזה של הקשבה עמוקה אנחנו מקיימות בתוכנו את המהות של וואבי סאבי, מסכימות לאהוב את עצמנו כך, להתבונן בעצמנו במבט חומל, נקי משיפוטיות ואז נגלה לעייננו יופי רב, יופי עצום!<br />וזהו יופיינו שלנו, במלוא הדרו."</p>
	</>;
}