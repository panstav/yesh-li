import Section from "@wrappers/Section";
import { Coffee, DoubleCheck, Gear, LifeSaver, Plant } from "@elements/Icon";

import { backgroundColorBlueLightStyle } from "./css";

const copy = [
	{
		Icon: Gear,
		title: 'עבודה יסודית ומדוייקת',
		description: 'עוברים על הכל, לא משאירים סימני שאלה. אם ניתקל בממצא חריג, נדאג לחזור אליכם עם תשובה'
	},
	{
		Icon: Plant,
		title: 'בגובה עיניים',
		description: 'נסביר הכל בפשטות וסבלנות, בשפה ברורה. זו לא אשמתך שעולם הדיגיטל משתדרג כל יומיים'
	},
	{
		Icon: Coffee,
		title: 'טכנולוגיה לשירותך',
		description: 'נעדכן ונגדיר תוכנות קריטיות בצורה אופטימלית עבורך. לפעמים מספיק לאפשר למערכת לעשות את שלה'
	},
	{
		Icon: LifeSaver,
		title: 'נותנים גב',
		description: 'נדאג שכל מה שחשוב מגובה לפני כל פעולה. זה רק וירטואלי אבל זו לא סיבה להקל ראש'
	},
	{
		Icon: DoubleCheck,
		title: 'מהיום למחר',
		description: 'נהיה מוכנים בשעה שנוחה לך. הלו"ז שלנו גמיש ויותר חשוב שלך יהיה את הזמן לכך'
	}
];

export default function Features () {
	return <div className="pb-6" style={backgroundColorBlueLightStyle}>
		<Section withTopMargin={false}>
			<div className="columns is-multiline is-justify-content-center">
				{copy.map(({ Icon, title, description }) => <div key={title} className="column is-one-third-widescreen is-half-tablet py-2-mobile">
					<div className="box is-flex py-4" style={{ height: '100%' }}>
						<Icon className="has-text-info mt-1" style={{ minWidth: '1.5rem' }} />
						<div className="mr-4">
							<h3 className="has-text-weight-bold is-size-5 mb-1" style={{ lineHeight: '1.4' }}>{title}</h3>
							<p className="has-text-justified">{description}</p>
						</div>
					</div>
				</div>)}
			</div>
		</Section>
	</div>;
}