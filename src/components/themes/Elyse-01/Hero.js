import { Link } from "gatsby";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import Section from "@wrappers/Section";

import { PageContext, onClickMarkInterest } from ".";
import Socials from "./Socials";
import FlexImage from "./FlexImage";

export default function Hero() {
	const { setValue } = useFormContext();
	const { css, content: { fullName, occupation, description, portrait, sections, socials } } = useContext(PageContext);
	return <div className="pb-5-mobile" style={{ borderBottom: css.border }}>
		<div className="is-small-mobile mx-auto">
			<div className="columns is-align-items-stretch m-0">
				<div className="column is-one-third p-0">
					<FlexImage {...portrait} isCover />
				</div>
				<div className="column is-two-thirds is-flex is-align-items-center py-6">
					<Section noTopMargin>
						<h2 className="subtitle is-4">{fullName}</h2>
						<h1 className="title is-1 is-size-2-mobile">{occupation}</h1>
						<p className="is-large mb-5">{description}</p>
						<div className="tags are-medium">
							{sections.map(({ label, anchor, color }) => {
								return <Link key={anchor} to={`#${anchor}`} replace {...onClickMarkInterest(label, setValue)} className="tag has-text-weight-bold has-text-white" style={{ backgroundColor: `var(--color-${color})` }}>{label}</Link>;
							})}
						</div>
						{!!Object.keys(socials).length && <Section noSidePadding className="is-medium mr-0">
							<Socials className="mt-5 are-small" />
						</Section>}
					</Section>
				</div>
			</div>
		</div>
	</div>;
}