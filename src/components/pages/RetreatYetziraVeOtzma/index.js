import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import { Hero, Description, Delimiter, Guides, WhosThisFor, Signup, Footer } from "@shared/shila";
import { PageContext } from "@shared/shila/contexts";

import Schedule from "./Schedule";
import Gallery from './Gallery';
import Details from './Details';

import slides from './_data/slides';

RetreatYetziraVeOtzmaPage.config = {
	isSoldOut: true,
	title: 'ריטריט יצירה ועוצמה בערבה',
	dates: '26-28.01.23',
	description: 'יצירה בחומרים נטושים וחומרי טבע בסטודיו בלב המדבר.',
	background: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg',
	emailAddress: 'ksamardigital@gmail.com'
};

export default function RetreatYetziraVeOtzmaPage() {
	return <PageContext.Provider value={RetreatYetziraVeOtzmaPage.config}>
		<Hero />
		<Description>
			<DescriptionContent />
		</Description>
		<Delimiter height={100} />
		<Guides />
		<Section withTopMargin={false} className="mt-3">
			<WhosThisFor />
		</Section>
		<Section withTopMargin={false} className="mt-3">
			<GlassBox>
				<Schedule />
			</GlassBox>
		</Section>
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
		<p>זו הזמנה לחוויה בה ניצור עם חומרים נטושים וחומרי טבע בסטודיו בלב המדבר.</p>
		<p>נפתח את הרגש וניתן לאינטואיציה להוביל לביטוי קסום ומרגש. נצא לסיור ליקוט בג&apos;נקיה מהיפות בארץ ובמטע התמרים, ונלמד טכניקות יצירה שונות, נתחבר לעצמנו בפשטות בלתי נשכחת, נאפשר לעצמנו ולחוות ימי התכנסות והתמלאות פנימית.</p>
		<p>בסמר נאצרו במשך שנים רבות חומרים משומשים מסוגים ומקורות שונים שנועדו להשראה ולשימוש חוזר, נערוך בג&apos;נקיה סיור ליקוט והשראה. נסייר ונלקט גם במטע התמרים האורגני של הקיבוץ ונתבשם בטעימות הסילאן המקומי.</p>
		<p>שעות היצירה יתקיימו בסטודיו בסמר, הלינה תהיה בחדרים נוחים ונעימים בקיבוץ השכן, אליפז.</p>
		<p>לאורך הרטריט, בהיפתחנו לעולם פנימי חדש, תלווה אותנו מחברת שתהווה יומן מסע תומך לימים המיוחדים שנעבור. פינוקים נוספים מובטחים.</p>
	</>
}