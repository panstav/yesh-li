import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import Section from "@wrappers/Section";

import { useCollectionPageContent, useSiteContent } from "@hooks/use-site-data";

import Hero from "@domains/india4wdtours/elements/Hero";
import DelimiterGallery from "@domains/india4wdtours/elements/DelimiterGallery";

import { wrapPage } from "@domains/india4wdtours";
import { infoDescriptionTopMargin } from "@domains/india4wdtours/index.module.sass";

import TopSection from "./Top";
import Info from "./Info";
import Description from "./Description";
import Routes from "./Routes";
import Reviews from "./Reviews";

import DestinationContext from "./context";

const asideWidth = '14rem';

export { default as Head } from "./Head";

export default wrapPage(DestinationPage);

function DestinationPage() {
	const destinationData = useCollectionPageContent();
	destinationData.routes = useSiteContent().collectionPages.route.filter(({ itinerary }) => itinerary.find(({ slug }) => destinationData.slug === slug));

	const { featuredImage, images } = destinationData;

	const { descriptionMaxHeight, asideRef } = useDescriptionHeightMatcher();

	const infoDescriptionClassName = classNames("is-flex-tablet is-flex-direction-row-reverse is-align-items-start is-flex-gap-5", infoDescriptionTopMargin);

	return <DestinationContext.Provider value={destinationData}>

		<Hero {...{ featuredImage }} />

		<TopSection asideWidth={asideWidth} />

		<Section noTopMargin className={infoDescriptionClassName}>
			<Info containerRef={asideRef} className="py-3 mb-5 mt-5-mobile" style={{ minWidth: asideWidth }} />
			<Description limitHeight={descriptionMaxHeight} className="pt-3" />
		</Section>

		<Section>
			<Routes />
		</Section>

		<Section>
			<Reviews />
		</Section>

		<Section noTopMargin noSidePadding className="pt-6 mt-6">
			<DelimiterGallery images={images} />
		</Section>

	</DestinationContext.Provider>;
}

function useDescriptionHeightMatcher() {

	const [descriptionMaxHeight, setDescriptionMaxHeight] = useState();
	const asideRef = useRef();

	useEffect(() => {
		if (!asideRef.current || descriptionMaxHeight) return;

		// bail if we're on mobile
		if (window.innerWidth / 2 < asideRef.current.offsetWidth) return;

		setDescriptionMaxHeight(Math.round(asideRef.current.offsetHeight * 1.1));
	}, [asideRef]);

	return { descriptionMaxHeight, asideRef };

}