import { Link } from "gatsby";
import { useContext } from "react";
import classNames from "classnames";

import Section from "@wrappers/Section";
import Modal, { useModal } from "@wrappers/Modal";
import { Bit, Checkmark } from "@elements/Icon";

import { AuthContext, copy } from ".";
import { titleFont } from './index.module.sass';

const benefits = [
	'99.9% זמינות',
	'תמיכה מלאה במייל',
	'שדרוגים לאורך הדרך',
	'התראה לפני חידוש המנוי'
// 'אפשרות להקפיא ולהפשיר את החשבון',
// 	'מקבלים תשלום ב-ביט',
// 	'בקרוב גם ב: אשראי, גוגל פיי, אפל פיי'];
];

export default function CTA({ id }) {
	const { role } = useContext(AuthContext);

	const [paymentModal, setPaymentModal] = useModal();
	const showPaymentModal = () => setPaymentModal();

	const title = (() => {
		if (role === 'MEMBER') return 'ברוכים השבים!';
		if (role === 'TRIAL') return 'מוציאים את העמוד לאור';
		return 'נסו את מערכת ניהול התוכן כעת';
	})();

	const subtitle = (() => {
		if (!role || role === 'GUEST') return copy.freeAndCommitmentFree;
		if (role === 'TRIAL') return 'לאורך כל המנוי העמוד יהיה נגיש למבקרים וחשוף בפני מנועי חיפוש ורשתות חברתיות';
	})();

	const cta = (() => {
		if (!role || role === 'GUEST') return 'יאללה, מתחילים!';
		return 'חזרה למערכת הניהול';
	})();

	const href = (() => {
		if (!role || role === 'GUEST') return '/start';
		return '/editor';
	})();

	const headerClassName = classNames('is-size-3 has-text-weight-bold mb-2', titleFont);
	const titleClassName = classNames('title is-3 mb-5', titleFont);

	return <>

		<div id={id} className="has-background-primary has-text-centered has-text-white py-6">
			<div className="block">
				<p className={headerClassName}>{title}</p>
				{subtitle && <p>{subtitle}</p>}
			</div>

			{role === 'TRIAL' && <Section noTopMargin className="is-medium mb-5">
				<div className="box is-flex-tablet is-flex-gap-3 has-text-start">
					<div className="mb-5-mobile">
						<h2 className={titleClassName}>מנוי שנתי</h2>
						<div className="is-flex is-flex-grow-2 is-flex-wrap-wrap is-flex-gap-5">
							{benefits.map((benefit) => {
								return <div key={benefit} className="is-flex is-align-items-center">
									<Checkmark className="has-text-primary me-1" style={{ fontSize: '1.5rem', lineHeight: '1' }} />
									<span className="text-icon">{benefit}</span>
								</div>;
							})}
						</div>
					</div>
					<div className="box is-flex is-flex-direction-column is-justify-content-space-between has-background-primary is-shadowless has-text-white has-text-centered">
						<div className="is-flex-mobile is-justify-content-center is-align-items-baseline is-flex-gap-3">
							<p>
								<span className="is-size-4">₪</span>
								<span className="is-size-2">520</span>
							</p>
							<p className="is-size-4">/שנה</p>
						</div>
						<button onClick={showPaymentModal} className="button has-text-primary has-text-weight-bold mt-2">הוצאה לאור</button>
					</div>
				</div>
			</Section>}

			{cta && <Link to={href} className="button is-medium is-primary is-rounded mt-5" style={{ border: '1px solid white' }}>{cta}</Link>}
		</div>

		<Modal {...paymentModal} render={() => <>
			<div className="is-flex is-justify-content-center mb-5">
				<Bit className="has-background-success p-3" style={{ width: '6rem', borderRadius: '100%', height: '6rem' }} />
			</div>
			<p>אנחנו כרגע מקבלים תשלום רק ב-ביט. באופן הבא:</p>
			<ol className="mt-2 mx-4">
				<li>העבירו ₪520 למספר 054-229-6262</li>
				<li>צרו קשר בוואטסאפ או בכתובת המייל <a href="mailto:hello@yesh.li" target="_blank" rel="noopener noreferrer">hello@yesh.li</a></li>
				<li>נעדכן את החשבון שלכם עם מנוי השנתי והעמוד שלכם יהיה און-ליין</li>
			</ol>
		</>} />

	</>;
}