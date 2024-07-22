import { useContext } from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import Section from "@wrappers/Section";
import RenderChildren from "@wrappers/RenderChildren";

import { useCollectionPageContent } from "@hooks/use-site-data";

import Hero from "@domains/india4wdtours/elements/Hero";
import DelimiterGallery from "@domains/india4wdtours/elements/DelimiterGallery";
import PageTitle from "@domains/india4wdtours/elements/PageTitle";
import AttractionTags from "@domains/india4wdtours/elements/AttractionTags";
import InfoAside from "@domains/india4wdtours/elements/InfoAside";
import Certified from "@domains/india4wdtours/elements/Certified";
import StickyHeader, { getCtaClassNames, getTitleClassNames, ratingStarStyle } from "@domains/india4wdtours/elements/StickyHeader";
import RatingStars from "@domains/india4wdtours/elements/RatingStars";
import GuideAvatar from "@domains/india4wdtours/elements/GuideAvatar";

import { wrapPage } from "@domains/india4wdtours";

import Itinerary from "./Itinerary";
import Map from "./Map";
import Reviews from "./Reviews";

import RouteContext from "./context";
import { routeinfoContainer } from './index.module.sass';

export { default as Head } from "./Head";

export default wrapPage(RoutePage);

function RoutePage() {
	const routeData = useCollectionPageContent();

	routeData.rating = !routeData.reviews.length ? null : routeData.reviews.reduce((acc, review) => acc + review.rating, 0) / routeData.reviews.length;

	const infoClassName = classNames("is-flex-shrink-0 has-text-centered pb-4", routeinfoContainer);

	return <RouteContext.Provider value={routeData}>

		<StickyTop />

		<Hero featuredImage={routeData.featuredImage} />

		<Section>
			<PageTitle>{routeData.title}</PageTitle>
			{routeData.subtitle && <h2 className="subtitle is-6 is-size-5-tablet has-text-weight-normal">{routeData.subtitle}</h2>}
			<AttractionTags tags={routeData.tags} />
		</Section>

		<Section noTopMargin className="is-flex-tablet is-flex-direction-row is-align-items-flex-start is-flex-gap-5 mt-5">
			<div className="content" dangerouslySetInnerHTML={{ __html: routeData.contentHtml }} />
			<InfoAside className={infoClassName}>
				<Guide />
				<Order />
			</InfoAside>
		</Section>

		<Section>
			<Itinerary />
		</Section>
		<Section noTopMargin className="mt-4">
			<Map />
		</Section>

		<Section>
			<Reviews id="reviews" />
		</Section>

		<Section noTopMargin noSidePadding className="pt-6 mt-6">
			<DelimiterGallery images={routeData.images} />
		</Section>

	</RouteContext.Provider>;

}

function StickyTop() {
	const { title, subtitle, rating } = useContext(RouteContext);

	const TitleWrapper = rating ? 'div' : RenderChildren;

	const titleClassName = getTitleClassNames({ withTitleAside: !!rating });
	const ctaClassName = getCtaClassNames();

	return <StickyHeader>
		<div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%' }}>
			<div className="is-flex is-flex-direction-column is-flex-gap-4">
				<TitleWrapper className="is-flex is-flex-wrap-wrap is-align-items-baseline">
					<div className={titleClassName}>{title}</div>
					{!!rating && <RatingStars {...{
						rating,
						iconStyle: ratingStarStyle,
						href: `#reviews`,
						containerStyle: { marginTop: '1px' }
					}} />}
				</TitleWrapper>
				{subtitle && <div className="subtitle is-inline-block is-7 is-size-6-tablet has-text-weight-normal" style={{ lineHeight: '1.25rem' }}>{subtitle}</div>}
			</div>
			<a className={ctaClassName} onClick={console.log}>Order now</a>
		</div>
	</StickyHeader>;
}

function Guide() {
	const { guide } = useCollectionPageContent();

	return <>
		<Link to={`/guide/${guide.slug}`}>
			<GuideAvatar {...guide.avatar} />
		</Link>
		<div className='is-size-7 has-text-grey'>Route&apos;s guide:</div>
		<div className="reset-anchors" style={{ marginTop: '-0.25rem' }}>
			<Link to={`/guide/${guide.slug}`} className="is-size-4">{guide.name}</Link>
		</div>
		{guide.isCertified && <Certified className="is-white mx-auto" />}
	</>;
}

function Order() {
	return <button className="button is-success is-size-6 is-size-5-tablet has-text-weight-medium has-strong-radius mt-3" style={{ textWrap: 'wrap', height: 'auto' }}>
		Order now for $750/person
	</button>;
}