import classNames from "classnames";

import Section from "@wrappers/Section";
import { Email, Facebook, Instagram, LinkedIn, Phone, Pinterest, TikTok, WhatsApp, YouTube } from "@elements/Icon";

import { aboveGlow } from '../index.module.sass';
import { socialIconsContainer, socialIcon } from './index.module.sass';

export default function Socials() {

	const mobileContainerClassName = classNames("is-flex is-justify-content-space-around is-hidden-tablet", socialIconsContainer, aboveGlow);
	const largerContainerClassName = classNames("is-flex is-justify-content-space-around is-hidden-mobile", socialIconsContainer, aboveGlow);

	return <div>
		<Section className={mobileContainerClassName}>
			{[Facebook, Instagram, WhatsApp, LinkedIn, YouTube].map((Icon) => {
				return <Icon key={Icon.name} className={socialIcon} style={{ color: `var(--color-${Icon.name.toLowerCase()})` }} />;
			})}
		</Section>
		<Section noTopMargin className={mobileContainerClassName} style={{ marginTop: '1rem' }}>
			{[TikTok, Pinterest, Email, Phone].map((Icon) => {
				return <Icon key={Icon.name} className={socialIcon} style={{ color: `var(--color-${Icon.name.toLowerCase()})` }} />;
			})}
		</Section>
		<Section className={largerContainerClassName}>
			{[Facebook, Instagram, WhatsApp, LinkedIn, YouTube, TikTok, Pinterest, Email, Phone].map((Icon) => {
				return <Icon key={Icon.name} className={socialIcon} style={{ color: `var(--color-${Icon.name.toLowerCase()})` }} />;
			})}
		</Section>
	</div>;
}