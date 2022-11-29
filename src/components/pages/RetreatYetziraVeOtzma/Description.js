import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import Signup from './Signup';

export default function Description () {
	return <Section withTopMargin={false} className="mt-5 is-medium">
		<GlassBox>
			<Title />
			<LongForm />
			<Signup className="mt-6" />
		</GlassBox>
	</Section>
}

function LongForm() {
	return <div className='mt-5 content'>
		<p>זו הזמנה לחוויה בה ניצור עם חומרים נטושים וחומרי טבע בסטודיו בלב המדבר.</p>
		<p>נפתח את הרגש וניתן לאינטואיציה להוביל לביטוי קסום ומרגש. נצא לסיור ליקוט בג'נקיה מהיפות בארץ ובמטע התמרים, ונלמד טכניקות יצירה שונות, נתחבר לעצמנו בפשטות בלתי נשכחת, נאפשר לעצמנו ולחוות ימי התכנסות והתמלאות פנימית.</p>
		<p>בסמר נאצרו במשך שנים רבות חומרים משומשים מסוגים ומקורות שונים שנועדו להשראה ולשימוש חוזר, נערוך בג'נקיה סיור ליקוט והשראה. נסייר ונלקט גם במטע התמרים האורגני של הקיבוץ ונתבשם בטעימות הסילאן המקומי.</p>
		<p>שעות היצירה יתקיימו בסטודיו בסמר, הלינה תהיה בחדרים נוחים ונעימים בקיבוץ השכן, אליפז.</p>
		<p>לאורך הרטריט, בהיפתחנו לעולם פנימי חדש, תלווה אותנו מחברת שתהווה יומן מסע תומך לימים המיוחדים שנעבור. פינוקים נוספים מובטחים.</p>
	</div>;
}

function Title() {
	return <h1 className="has-text-centered">
		<span className="is-size-2 has-text-weight-bold">ריטריט יצירה ועוצמה בערבה</span>
		<br />
		<span className="is-size-3 has-text-weight-bold has-text-grey">26-28.01.23</span>
	</h1>
}