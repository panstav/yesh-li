import classNames from "classnames";

import Section from "@wrappers/Section";
import { AddContact, Celebration, Coffee, Copy, DoubleCheck, Eye, Gear, Person, Plant, Responsive, Share, Upload } from "@elements/Icon";

import YeshLiLogo from "@domains/yeshli/elements/Logo";
import SectionTitle from "@domains/yeshli/elements/SectionTitle";

import { titleFont } from '@domains/yeshli/index.module.sass';
import { aboveGlow } from '@domains/yeshli/Index/index.module.sass';

import { benefitsContainer, benefit, benefitsGlow } from './index.module.sass';

const benefits = [
	{
		title: 'מאוד ידידותי למשתמש',
		description: 'עם יש.לי אפשר ליצור עמוד מקצועי תוך כמה דקות, אין צורך בידע מקדים או בליווי של מתכנת/ת או מעצב/ת.',
		Icon: Celebration
	},
	{
		title: 'כל הקישורים שלך במקום אחד',
		description: 'פייסבוק, טוויטר, לינקדין, יוטיוב, הוספת איש קשר, וואטסאפ, מייל, טלפון - יש מקום להכל ובקרוב נוסיף עוד.',
		Icon: DoubleCheck
	},
	{
		title: 'תצוגה מקדימה מיידית',
		description: 'ליד עריכת העמוד אפשר לראות את כל השינויים בלייב - תוך כדי הקלדה.',
		Icon: Eye
	},
	{
		title: 'התאמה מלאה למכשירים',
		description: 'העמודים של יש.לי נראים מעולה על כל מסך - סמארטפון, טאבלט ומסכי מחשב. אפשר גם לנהל את התוכן מכל מכשיר שנוח לך.',
		Icon: Responsive
	},
	{
		title: 'שיתוף בלחיצת כפתור',
		description: 'כל אחד יכול בקלות לשתף את העמוד עם QR, וואטסאפ, פוסט או הודעה פרטית.',
		Icon: Share
	},
	{
		title: 'קידום אורגני עלינו',
		description: 'העמוד שלך ידאג לחשוף בצורה מיטבית את כל הפרטים שלך בפני מנועי חיפוש ורשתות חברתיות.',
		Icon: Gear
	},
	{
		title: 'לקוחות ייצרו קשר דרך העמוד',
		description: 'עם טופס פשוט לקוחות יכולים למלא פרטים שיעברו ישירות לאקסל (בקרוב אפשרות לקבל את הפניות גם במייל)',
		Icon: AddContact
	},
	{
		title: 'הכל בבקרת איכות',
		description: 'העמוד שלך יעמוד בסטנדרטים מחמירים של ענקיות הרשת. מבחינת נוחות שימוש, זמן טעינה ואבטחה - אין דברים כאלה.',
		Icon: Coffee
	},
	{
		title: 'עמוד שהולך שמשתבח',
		description: 'המערכת תמשיך להשתדרג ולהשתפר באופן תדיר, בהתחייבות - תכונות ויכולות חדשות, אינטגרציות וטכנולוגיות כולל AI, ועוד.',
		Icon: Upload
	},
	{
		title: 'ידידותי לסביבה',
		description: 'פעם הדפסנו כרטיסי ביקור, היום אנחנו גם חוסכים בעלויות הדפסה, גם בשימוש בנייר וגם - השרתים שלנו עובדים על הטכנולוגיה הירוקה של גוגל.',
		Icon: Plant
	},
	{
		title: 'ללא התחייבות',
		description: 'אפשר לבחון לעומק את המערכת בלי להרשם ובחינם - הדלת פתוחה וכולם מוזמנים.',
		Icon: Person
	},
	{
		title: 'בלי פרסומות',
		description: 'בעמודים של יש.לי אין שטח שהשארנו לטובת הפרסום של עצמנו, העמוד שלך משרת אותך נטו.',
		Icon: YeshLiLogo
	},
	{
		title: 'אפשרות לדומיין משלך',
		description: 'להראות מקצועי בפני מבקרים ומנועי חיפוש + תכונות ייחודיות כמו למשל התראות לנייד של לקוח וחזרה לעמוד ללא חיבור לאינטרנט.',
		Icon: ({ className, style = {} }) => <span className={`has-text-weight-bold ${className}`} style={{ lineHeight: 1, marginTop: '0.4rem', fontSize: '0.65rem', ...style }}>www</span>
	},
	{
		title: 'פוסטים אחרונים מרשתות חברתיות',
		description: 'לרענן את העמוד אוטומטית בכל פעם שיעלה פוסט חדש בפייסבוק, באינסטגרם ובטיקטוק שלך.',
		Icon: Copy,
		isPending: true
	}
];

export default function Benefits () {

	const containerClassName = classNames("is-relative", aboveGlow);
	const benefitClassName = classNames("box is-shadowless ps-3 has-strong-radius has-ribbon-end", benefit);
	const benefitTitleClassName = classNames("title is-5 mb-2", titleFont);

	return <Section isFullWidth className={containerClassName}>
		<div className={benefitsGlow} />
		<SectionTitle>למה כדאי להקים עמוד עם יש.לי?</SectionTitle>
		<div className={benefitsContainer}>
			{benefits.map(({ Icon, title, description, isPending }) => {
				return <div key={title} className={benefitClassName}>
					<div className="is-flex">
						<Icon className="is-flex-shrink-0 me-2" style={{ width: '1.5rem' }} />
						<div>
							<h3 className={benefitTitleClassName}>{title}</h3>
							<p>{description}</p>
						</div>
					</div>
					{isPending && <div className="ribbon is-small is-primary">בקרוב</div>}
				</div>;
			})}
		</div>
	</Section>;
}