import { Link } from "gatsby";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import Section from "@wrappers/Section";

import { PageContext, onClickMarkInterest } from ".";
import FlexImage from "./FlexImage";
import { serviceMediaSide } from './theme.module.sass';

export default function Services() {
	const { setValue } = useFormContext();
	const { content: { sections } } = useContext(PageContext);
	const serviceMediaSideClassName = classNames('column is-one-third', serviceMediaSide);
	return <Section noTopMargin>
		{sections.map(({ label, anchor, color, content, image, ctaText }, index) => {
			const innerClassName = classNames('has-background-white has-strong-radius p-5-tablet', index % 2 && 'is-flex-direction-row-reverse');
			return <div id={anchor} key={anchor} className="pt-6">
				<div className="is-relative">
					<div className="has-strong-radius" style={{ position: 'absolute', top: '0.3rem', bottom: '-0.3rem', insetInlineStart: '-0.3rem', insetInlineEnd: '0.3rem', backgroundColor: `var(--color-${color}-half)`, zIndex: -1 }} />
					<div className={innerClassName} style={{ border: `2px solid var(--color-${color}-quarter)` }}>
						<div className="columns is-mobile is-flex-gap-2-tablet is-align-items-stretch m-0">
							<div className={serviceMediaSideClassName}>
								<div className="has-strong-radius" style={{ overflow: 'hidden', height: '100%' }}>
									<FlexImage {...image} isCover />
								</div>
							</div>
							<div className="column is-two-thirds is-flex is-flex-direction-column is-justify-content-center is-align-items-start py-5">
								<h2 className="title is-4 has-text-weight-normal m-0">{label}</h2>
								<div className="is-hidden-tiny mt-4">
									<ContentAndCTA {...{ setValue, content, ctaText, label, color }} />
								</div>
							</div>
						</div>
						<div className="is-hidden-not-tiny px-4 pb-4">
							<ContentAndCTA {...{ setValue, content, ctaText, label, color }} />
						</div>
					</div>
				</div>
			</div>;
		})}
	</Section>;
}

function ContentAndCTA({ setValue, label, content, ctaText, color }) {
	return <>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Link to="#contact-form" replace {...onClickMarkInterest(label, setValue)} className="button has-text-white mt-3" style={{ backgroundColor: `var(--color-${color})` }}>{ctaText}</Link>
	</>;
}