import { Link } from "gatsby";
import { createContext, useEffect, useState } from "react";
import classNames from "classnames";

import Section from "@wrappers/Section";
import Spacer from "@elements/Spacer";
import xhr from "@services/xhr";

import Hero from "./Hero";
import Socials from "./Socials";
import Benefits from "./Benefits";
import CTA from "./CTA";
import WhosItFor from "./WhosItFor";
import FartherQuestions from "./FurtherQuestions";

import './index.sass';
import { titleFont, footerGlow } from './index.module.sass';

export const AuthContext = createContext();

export const featuredImage = "https://storage.googleapis.com/yeshli-www/assets/yeshli-home-featured-02.png";
export const topImageSrc = {
	small: "https://storage.googleapis.com/yeshli-www/assets/page-mockup-05-small.webp",
	regular: "https://storage.googleapis.com/yeshli-www/assets/page-mockup-04.webp"
};

export const copy = {
	freeAndCommitmentFree: 'חינם וללא התחייבות'
};

export default function IndexPage () {
	return <Auth>
		<Hero />
		<Socials />
		<Spacer />
		<Spacer />
		<Benefits />
		<Spacer />
		<WhosItFor />
		<Spacer />
		<Spacer />
		<EditorMock />
		<CTA id="purchase" />
		<Spacer />
		<FartherQuestions />
		<Spacer />
		<Spacer />
		<Footer />
	</Auth>;
}

export function SectionTitle({ className: classes, children }) {
	const titleClassName = classNames("title is-3 has-text-centered", titleFont, classes);
	return <h2 className={titleClassName} style={{ lineHeight: '1.3' }}>{children}</h2>;
}

function Auth ({ children }) {

	const [user, setUser] = useState();

	useEffect(() => {
		if (user) return;
		xhr.getUserIdentity().then(setUser);
	}, []);

	return <AuthContext.Provider value={user || {}}>
		{children}
	</AuthContext.Provider>;

}

function Footer () {
	const domainClassName = classNames("title is-3 is-flex-shrink-0 has-text-weight-normal pb-1 my-0", titleFont);

	return <>
		<Section noTopMargin className="my-1">
			<BottomLink dotPrefix={false} href="/editor" label="התחברות" />
			<BottomLink href="/terms-of-use" label="תנאי שימוש" />
			<BottomLink href="/privacy-policy" label="מדיניות פרטיות" />
		</Section>
		<footer className="is-relative" style={{ overflow: 'hidden' }}>
			<div className={footerGlow} />
			<Section noTopMargin className="is-flex is-justify-content-space-between is-align-items-center has-text-centered py-3">
				<div className="has-text-start" style={{ width: '8rem' }}>אתר שגדל איתך</div>
				<div className={domainClassName}>יש.לי</div>
				<div className="is-size-7 has-text-end" style={{ paddingTop: '0.1em', width: '8rem' }}>2019-{new Date().getFullYear()} ©</div>
			</Section>
		</footer>
	</>;
}

function BottomLink ({ dotPrefix = true, href, label }) {
	return <>
		{dotPrefix && <span className="has-text-weight-bold px-2" style={{ fontSize: '0.75em' }}>·</span>}
		<Link to={href}>{label}</Link>
	</>;
}

function EditorMock () {
	return <Section noTopMargin isFullWidth className="is-flex is-justify-content-center">
		<img src="https://storage.googleapis.com/yeshli-www/assets/editor-preview-mock-03.webp" alt="מערכת ניהול התוכן ביש.לי עם תצוגה מקדימה שמתעדכנת תוך כדי הקלדה" width="1038" height="616" loading="lazy" />
	</Section>;
}