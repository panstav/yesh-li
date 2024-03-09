import GlassBox from "@wrappers/GlassBox";

import usePageContent from "@hooks/use-page-content";

import Heading from "./Heading";

export default function Details() {
	const { workshopDetails, retreatPrice, registrationPrice, lastDayToRegister, accommodationDetails, roomTypes, cancellationPolicy } = usePageContent();

	return <>
		<GlassBox>
			<Heading>פרטים נוספים:</Heading>
			<div className="content" dangerouslySetInnerHTML={{ __html: workshopDetails }} />
			<Heading>עלויות והזמנה:</Heading>
			<div className="block">
				<p>
					<span>מחיר הריטריט ₪{retreatPrice} </span>
					<span className="has-text-weight-bold">ללא לינות</span>
				</p>
				<p>מתוכם ₪{registrationPrice} דמי הרשמה.</p>
				<p>יתרת הסכום תשולם עד {lastDayToRegister}</p>
				<p>לאחר תאריך זה לא נוכל להבטיח השתתפות בריטריט.</p>
			</div>
			<div className="block">
				<p>התשלום על פי הפרטים כאן:</p>
				<p>בהעברה בנקאית לחשבון: בנק מזרחי, סניף אילת 470, מספר חשבון 330190, קיבוץ סמר. נא לציין <b>עבור ריטריט בערבה - איילת קוז&apos;יץ</b></p>
				<p>בבקשה שלחו אסמכתא על התשלום לאיילת קוז&apos;יץ: <a href="tel:+972523947909">052-394-7909</a></p>
			</div>
			<div className="block">
				<p>להזמנת החדר באירוח אליפז, נא להתקשר לטלפון <a href="tel:+972523688384">052-368-8384</a> או <a href="tel:+97286356230">08-635-6230</a></p>
				<p>מומלץ להקדים ולהזמין כי מספר החדרים מוגבל.</p>
			</div>
			<Heading>מחירי חדרים:</Heading>
			<div className="block">
				{roomTypes.map(({ name, persons, totalPrice }) => {
					const perPersonPrice = persons > 1 ? ` (₪${calcPerPersonPrice(totalPrice, persons)} לאדם)` : '';
					return <p key={name}>{name} 2 לילות: ₪{totalPrice}{perPersonPrice}</p>;
				})}
			</div>
			<div className="block">
				<div className="content" dangerouslySetInnerHTML={{ __html: accommodationDetails }} />
				<p>לתושבי האזור ואילת, ניתן להשתתף בסדנה ללא לינה ללא ארוחות בוקר וללא ארוחת ערב שישי בתשלום של ₪{retreatPrice}</p>
			</div>
			<div className="block has-text-weight-bold">
				<p>לכל שאלה בנושא התשלום או בכל מה שתרצו, נא התקשרו לאיילת <a href="tel:+972523947909">052-394-7909</a></p>
			</div>
			<div className="block">
				<p>מדיניות ביטולים:</p>
				<div dangerouslySetInnerHTML={{ __html: cancellationPolicy }} />
			</div>
		</GlassBox>
	</>;

	function calcPerPersonPrice(totalPrice, persons) {
		// round to 2 decimal places
		// remove zeroes after the decimal point
		// remove decimal point if no decimal part
		return (Math.round(totalPrice / persons * 100) / 100).toString().replace(/(\.0+|0+)$/, '');
	}

}