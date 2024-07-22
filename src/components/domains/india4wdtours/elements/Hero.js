import { createContext } from "react";
import classNames from "classnames";

import Section from "@wrappers/Section";
import RenderChildren from "@wrappers/RenderChildren";
import FlexImage from "@elements/FlexImage";

const HeroContext = createContext();

export default function Hero({ title, subtitle, featuredImage, cta, isBackgroundDark, isContained }) {
	const imageClassName = classNames(isContained && 'has-strong-radius');
	const titleClassName = classNames("title is-3 is-size-2-tablet is-spaced pb-2 mb-5", isBackgroundDark && "has-text-white");
	const subtitleClassName = classNames('subtitle is-5 is-size-4-tablet mb-5', isBackgroundDark && "has-text-white");

	return <div className="is-relative">
		<FlexImage {...featuredImage} className={imageClassName} style={{ height: '25rem' }} />
		{(title || subtitle) && <div className="is-overlay is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered px-4">
			<div>
				{title && <h1 className={titleClassName}>{title}</h1>}
				{subtitle && <h2 className={subtitleClassName}>{subtitle}</h2>}
			</div>
			{cta.href && <a className="button is-primary is-size-6 is-size-5-tablet" href={cta.href}>{cta.label}</a>}
		</div>}
	</div>;
}

function HeroOld(props) {
	const { subtitle, featuredImage, cta = {}, isBackgroundDark, isContained, textInCenter } = props;

	const Wrapper = isContained ? ContainedWrapper : DefaultWrapper;
	const TextWrapper = textInCenter ? 'div' : RenderChildren;
	const TextWrapperInner = textInCenter ? RenderChildren : isContained ? BelowHero : SectionedBelowHero;

	const imageClassName = classNames(isContained && 'has-strong-radius');
	const textContainerClassName = classNames('is-flex', textInCenter && "is-overlay is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered px-6");

	const subtitleClassName = classNames('subtitle', (isBackgroundDark && textInCenter) && "has-text-white", textInCenter ? "is-4 mb-5" : 'is-6 mb-4');
	const ctaClassName = classNames('button is-primary', textInCenter ? "is-medium" : 'ms-4-tablet me-2-tablet');

	return <HeroContext.Provider value={props}>
		<Wrapper className="is-relative">
			<FlexImage {...featuredImage} className={imageClassName} style={{ maxHeight: '25rem' }} />
			<TextWrapper className={textContainerClassName}>
				<TextWrapperInner className="mt-5">
					<div>
						<Title />
						{subtitle && <h2 className={subtitleClassName}>{subtitle}</h2>}
						<Tags />
					</div>
					{cta.href && <a className={ctaClassName} href={cta.href}>{cta.label}</a>}
				</TextWrapperInner>
			</TextWrapper>
		</Wrapper>
	</HeroContext.Provider>;
}

function SectionedBelowHero({ className, children }) {
	return <Section noTopMargin className={className}>
		<BelowHero>
			{children}
		</BelowHero>
	</Section>;
}

function BelowHero({ className: classes, children }) {
	const className = classNames('is-flex-tablet is-justify-content-space-between is-align-items-center', classes);
	return <div className={className}>
		{children}
	</div>;
}

function ContainedWrapper({ children }) {
	return <Section noTopMargin className="is-relative">
		{children}
	</Section>;
}

function DefaultWrapper({ children }) {
	return <div className="is-relative">
		{children}
	</div>;
}