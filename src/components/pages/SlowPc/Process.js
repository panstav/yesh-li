import Section from "@wrappers/Section";

import SubtleHeader from "./SubtleHeader";
import { backgroundColorBlueLightStyle } from "./css";

const copy = [
	{
		title: 'הגעת למקום הנכון',
		description: 'נשאר לך רק למלא את הטופס, כמה פרטים שיעזרו לנו להתכונן לקראת הטיפול'
	},
	{
		title: 'איך אומרים - נעשה זום',
		description: 'נציג שלנו יצור קשר וידאג יחד איתך לאפשר למומחה שלנו להתחבר למחשב שלך ולבצע את הטיפול'
	},
	{
		title: 'השאר עלינו',
		description: 'אפשר להשאר על הקו ולצפות בזמן אמת או להמשיך ביומך ולקבל התראה כשהטיפול הסתיים'
	},
	{
		title: 'יש מצב לסיבוב נוסף',
		description: 'לא הכל אנחנו יודעים לשלוף מהשרוול ולפעמים נצטרף לחזור אליך לסבב סגירת פינות'
	}
];

export default function Process () {
	return <>
		<Section className="has-text-centered pt-5">
			<SubtleHeader>איך זה עובד?</SubtleHeader>
			<p className="title is-4 my-3">העולם יכול להמשיך להוציא דגם חדש לכל דבר מדי עונה,</p>
			<p>אנחנו מאמינים שעם אהבה והשקעה המחשב יד שנייה שקנית לפני שנתיים יכול עוד להאריך ימים</p>
		</Section>
		<Section>
			<div className="columns is-multiline">
				{copy.map(({ title, description }, index) => {
					const circleStyles = Object.assign({ width: '2rem', height: '2rem', borderRadius: '100%' }, backgroundColorBlueLightStyle);
					return <div key={title} className="column is-one-quarter-widescreen is-half-desktop is-half-tablet mt-5">
						<div className="is-flex is-justify-content-center is-align-items-center" style={circleStyles}>{index + 1}</div>
						<p className="title is-5 my-3">{title}</p>
						<p>{description}</p>
					</div>;
				})}
			</div>
		</Section>
	</>;
}