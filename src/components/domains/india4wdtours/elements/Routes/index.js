import classNames from "classnames";

import FlexImage from "@elements/FlexImage";

import RatingStars from "@domains/india4wdtours/elements/RatingStars";
import AttractionTags from "@domains/india4wdtours/elements/AttractionTags";
import Certified from "@domains/india4wdtours/elements/Certified";
import { Clock, Dollar } from "@domains/india4wdtours/elements/Icon";

import calcRating from "@domains/india4wdtours/lib/calc-rating";
import { borderColor } from "@domains/india4wdtours/lib/css";

import { routeContainer, routeFeaturedImage } from "./index.module.sass";
import { isSuccessOnHover } from "@domains/india4wdtours/index.module.sass";
import { GoogleMapsPin } from "@elements/Icon";

const newLine = `
`;

export default function Routes({ currentDestinationTitle, noGuide, children: routes }) {
	return routes.map(({ title, slug, reviews, itinerary, guide, priceUsd, featuredImage, tags }) => {

		const totalDays = itinerary.reduce((acc, { daysAtLocation }) => acc + daysAtLocation, 0);
		const rating = calcRating(reviews);

		const bookButtonClassName = classNames("button is-small is-rounded ml-0 me-2", isSuccessOnHover);
		const routeContainerClassName = classNames("box is-paddingless is-flex-direction-row-reverse has-strong-radius", routeContainer);

		const otherThanCurrentDestinations = itinerary.filter(({ title }) => title !== currentDestinationTitle).map(({ title }) => title);

		return <div className={routeContainerClassName} key={slug}>
			<a href={`/route/${slug}`} className={routeFeaturedImage}>
				<FlexImage {...featuredImage} style={{ pointerEvents: 'none' }} />
			</a>
			<div className="p-3">
				<RatingStars rating={rating} href={`/route/${slug}`} className="is-flex mb-2" containerStyle={{ gap: '0.1rem' }} iconStyle={{ width: '1rem' }} />
				<div className="is-flex is-flex-wrap-wrap is-flex-gap-2 is-align-items-center mb-3">
					<div className="title is-5 mb-1" style={{ textWrap: "pretty" }}>
						<a href={`/route/${slug}`}>{title}</a>
					</div>
					<AttractionTags tags={tags} style={{ marginTop: '3px' }} />
				</div>
				<div className="is-flex is-align-items-center is-flex-gap-4 is-flex-wrap-wrap">
					<span className="is-flex is-align-items-center is-flex-gap-1">
						<Clock />
						<span>{totalDays} days</span>
					</span>
					<span className="is-flex is-align-items-center is-flex-gap-1">
						<GoogleMapsPin style={{ width: '1.25rem' }} />
						<span title={otherThanCurrentDestinations.join(newLine)}>{itinerary.length} destinations</span>
					</span>
					<span className="is-flex is-align-items-center is-flex-gap-1">
						<Dollar />
						<span>{priceUsd}</span>
					</span>
				</div>
				{!noGuide && <div className="is-flex is-align-items-center mt-3">
					<a href={`/guide/${guide.slug}`} className="is-flex is-align-items-center">
						<FlexImage {...guide.avatar} className="me-2" style={{ width: '2rem', height: '2rem', borderRadius: '100%', imageRendering: 'auto' }} />
						<span className="title is-6 has-text-weight-normal">{guide.name}</span>
					</a>
					{guide.isCertified && <Certified className="is-success ms-2" />}
				</div>}
				<div className="buttons pt-3 mt-3" style={{ borderTop: `1px solid ${borderColor}` }}>
					<button onClick={console.log} className={bookButtonClassName}>Book</button>
					<a href={`/route/${slug}`} className="button is-small is-rounded">Learn more</a>
				</div>
			</div>
		</div>;
	});
}