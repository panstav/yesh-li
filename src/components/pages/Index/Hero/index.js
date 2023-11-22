import { useContext } from "react";
import classNames from "classnames";

import { AuthContext, copy } from "..";
import { glow, heroContainer, titlesContainer, text3d, heroImageContainer, heroImage } from './index.module.sass';
import { titleFont } from '../index.module.sass';

export default function Hero() {

	const glowClassName = classNames("is-overlay", glow);
	const domainClassName = classNames("title is-3 is-block has-text-weight-normal has-text-white pb-2 mb-5", titleFont);
	const heroClassName = classNames("is-flex is-align-items-center", heroContainer);
	const titlesContainerClassName = classNames("is-flex is-flex-direction-column is-justify-content-center has-text-centered pb-6", titlesContainer);
	const h1TitleClassName = classNames("title is-size-1-desktop is-size-2-tablet-only has-text-white is-spaced", text3d);
	const subtitleClassName = classNames("subtitle has-text-white has-text-weight-bold is-size-4-desktop is-size-5-tablet-only mb-6", titleFont);
	const heroImageContainerClassName = classNames("is-flex is-justify-content-end", heroImageContainer);

	return <div className="has-background-primary has-text-centered is-relative pt-3" style={{ overflow: 'hidden' }}>
		<div className={glowClassName} />
		<span className={domainClassName}>יש.לי</span>
		<div className={heroClassName}>
			<div className={titlesContainerClassName}>
				<h1 className={h1TitleClassName}>עולים לאוויר בקלות<br />עם עמוד נחיתה מהמם <span>שנותן ביצועים</span></h1>
				<p className={subtitleClassName} style={{ textShadow: '1px 2px 3px rgb(0 0 0 / 20%)', letterSpacing: '1.3px' }}>בעוד כמה דקות חברים ולקוחות ירצו שגם להם יהיה</p>
				<CTA />
			</div>
			<div className={heroImageContainerClassName}>
				<img src="https://storage.googleapis.com/yeshli-www/assets/page-mockup-04.webp" className={heroImage} width="669" height="820" alt="דוגמה לעמוד במערכת יש.לי על גבי תצוגת סמארטפון" />
			</div>
		</div>
	</div>;
}

function CTA () {
	const { role } = useContext(AuthContext);

	if (!role || role === 'GUEST') return <div>
		<CtaButton href="/start">יצירת עמוד ב-יש.לי</CtaButton>
		<p className="is-size-7 has-text-grey mt-2">{copy.freeAndCommitmentFree}</p>
	</div>;

	if (role === 'TRIAL') return <div>
		<CtaButton href="#purchase">הוצאה לאור של העמוד שלך</CtaButton>
		<p className="is-size-7 has-text-grey mt-2">{copy.freeAndCommitmentFree}</p>
	</div>;

	return <div>
		<CtaButton href="/editor">עריכת העמוד שלך</CtaButton>
	</div>;
}
function CtaButton (props) {
	return <a className="button is-primary is-rounded is-medium" style={{ border: '2px solid rgb(255 255 255 / 75%)' }} {...props} />;
}