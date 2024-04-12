import OutboundLink from "@elements/OutboundLink";

const address = '';
// const address = 'וולפסון 49, ';

export default function ContactParagraph() {
	return <>

		<h2>יצירת קשר</h2>

		<p><b>יש.לי</b> היא מערכת מבית <b>סתו גפן - בניית אתרים</b><br />ח.פ 311655773<br />{address}ראשון לציון</p>

		<p>לכל שאלה או טענה - אנא שלחו לנו מייל לכתובת <OutboundLink href={`mailto:hello@yesh.li`}>hello@yesh.li</OutboundLink>.</p>

	</>;
}