import { useContext } from "react";
import classNames from "classnames";

import Section from "@wrappers/Section";
import RenderChildren from "@wrappers/RenderChildren";

import PageTitle from "@domains/india4wdtours/elements/PageTitle";
import AttractionTags from "@domains/india4wdtours/elements/AttractionTags";
import RatingStars from "@domains/india4wdtours/elements/RatingStars";
import StickyHeader, { getCtaClassNames, getTitleClassNames, ratingStarStyle } from "@domains/india4wdtours/elements/StickyHeader";

import { isSuccessOnHover } from "@domains/india4wdtours/index.module.sass";

import DestinationContext from "./context";

export default function TopSection({ asideWidth }) {
	const { title, subtitle, rating, tags } = useContext(DestinationContext);

	const isShowingRating = rating && rating >= 3.5;
	const TitleWrapper = isShowingRating ? 'div' : RenderChildren;

	const titleClassName = classNames(isShowingRating ? 'me-3 mb-2 mb-0-tablet' : 'pb-2 mb-5');
	const mobileCtaClassName = classNames("is-hidden-tablet button is-radiusless is-flex mt-5", isSuccessOnHover);
	const tabletCtaClassName = classNames("button mx-auto", isSuccessOnHover);
	const fixedTitleClassName = getTitleClassNames({ withTitleAside: isShowingRating });
	const fixedCtaClassName = getCtaClassNames();

	return <>
		<Section>
			<div className="is-flex-tablet is-justify-content-space-between">
				<div>
					<TitleWrapper className="is-flex is-flex-wrap-wrap is-align-items-baseline mb-3">
						<PageTitle className={titleClassName}>{title}</PageTitle>
						{isShowingRating && <Rating marginBetween="2px" />}
					</TitleWrapper>
					{subtitle && <h2 className="subtitle is-6 is-size-5-tablet has-text-weight-normal">{subtitle}</h2>}
					<AttractionTags tags={tags} />
				</div>
				<div className="is-hidden-mobile is-flex is-align-items-center" style={{ minWidth: asideWidth }}>
					<a className={tabletCtaClassName} onClick={console.log}>Get quotes</a>
				</div>
			</div>
		</Section>

		<a className={mobileCtaClassName} onClick={console.log}>Get quotes</a>

		<StickyHeader>
			<div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%' }}>
				<div className="is-flex is-flex-direction-column is-flex-gap-4">
					<TitleWrapper className="is-flex is-flex-wrap-wrap is-align-items-baseline">
						<div className={fixedTitleClassName}>{title}</div>
						{isShowingRating && <Rating />}
					</TitleWrapper>
					{subtitle && <div className="subtitle is-inline-block is-7 is-size-6-tablet has-text-weight-normal" style={{ lineHeight: '1.25rem' }}>{subtitle}</div>}
				</div>
				<a className={fixedCtaClassName} onClick={console.log}>Get quotes</a>
			</div>
		</StickyHeader>
	</>;
}

function Rating() {
	const { title, rating = 0 } = useContext(DestinationContext);

	return <RatingStars {...{
		rating,
		iconStyle: ratingStarStyle,
		title: (rating) => `${rating} / 5 stars on Google Maps reviews`,
		href: `https://maps.google.com/?q=${title}`,
		containerStyle: { marginTop: '1px' }
	}} />;
}