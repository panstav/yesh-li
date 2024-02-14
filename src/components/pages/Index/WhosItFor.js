import Section from "@wrappers/Section";

import { SectionTitle } from ".";

export default function WhosItFor () {
	return <Section isFullWidth>
		<SectionTitle>למי זה הכי מתאים?</SectionTitle>
		<div className="is-flex-desktop is-align-items-center is-flex-gap-5">
			<div>
				<p className="box is-shadowless has-background-primary has-strong-radius has-text-white is-size-5 mb-5-touch">יש.לי הכי מתאימה <b>לבעלי עסקים שמחפשים פיתרון איכותי לשידרוג הנוכחות ברשת</b>, מבלי ללמוד את הפרטים הטכניים של אתר אינטרנט, תהליך שלוקח שנים לאנשי המקצוע. במקום להשקיע בשבועות ולפעמים בחודשים של פיתוח אתר שמותאם אישית על ידי מקצוען, המערכת מציעה <b>פיתרון נוח, יעיל ומיידי שמאפשר לך להתקדם בפיתוח העסקי.</b></p>
			</div>
			<div>
				<p className="box is-shadowless has-background-danger-light has-strong-radius mb-5-touch">המערכת פחות מתאימה <b>למתכנתים/ות</b>. יש אפשרות להטמיע פתרונות תכנותיים מותאמים אישית, אך סביר שישתלם יותר לעבוד עם מערכת ייעודית כמו WordPress.</p>
			</div>
			<div>
				<p className="box is-shadowless has-background-danger-light has-strong-radius mb-5-touch">המערכת פחות מתאימה <b>למעצבים/ות</b>. יש אפשרות להטמיע פתרונות עיצוביים מותאמים אישית, אך סביר שישתלם יותר לעבוד עם מערכת ייעודית כמו Wix.</p>
			</div>
		</div>
	</Section>;
}