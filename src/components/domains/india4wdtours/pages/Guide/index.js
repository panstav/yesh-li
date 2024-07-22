import classNames from "classnames";

import Section from "@wrappers/Section";
import { useModal } from "@wrappers/Modal";

import { useCollectionPageContent, useSiteContent } from "@hooks/use-site-data";

import Hero from "@domains/india4wdtours/elements/Hero";
import DelimiterGallery from "@domains/india4wdtours/elements/DelimiterGallery";
import PageTitle from "@domains/india4wdtours/elements/PageTitle";
import Routes from "@domains/india4wdtours/elements/Routes";
import GuideAvatar from "@domains/india4wdtours/elements/GuideAvatar";
import Reviews, { EmptyState as ReviewsEmptyState, maxReviewsOutsideModal } from "@domains/india4wdtours/elements/Reviews";
import SectionTitle from "@domains/india4wdtours/elements/SectionTitle";

import { wrapPage } from "@domains/india4wdtours";
import calcRating from "@domains/india4wdtours/lib/calc-rating";
import { isSuccessOnHover } from "@domains/india4wdtours/index.module.sass";

import GuideContext from "./context";

import Info from "./Info";

export { default as Head } from "./Head";

export default wrapPage(GuidePage);

function GuidePage() {
	const guideData = useCollectionPageContent();
	const { collectionPages: { route: allRoutes } } = useSiteContent();

	const [reviewsModal, showReviewsModal] = useModal();
	const showAllReviews = {
		wrapper: 'a',
		className: 'is-small',
		onClick: () => showReviewsModal(),
		children: 'Show all'
	};

	guideData.routes = allRoutes.filter(({ guide }) => guide.slug === guideData.slug);
	guideData.rating = calcRating(guideData.routes.reduce((accu, { reviews }) => accu.concat(reviews), []));
	guideData.reviews = guideData.routes.reduce((accu, { title, reviews }) => accu.concat(reviews.map((review) => ({ routeTitle: title, ...review }))), []);
	guideData.languages = Object.entries({
		"English": "Fluent",
		"Hindi": "Fluent",
		"Spanish": "Basic"
	}).reduce((accu, [language, level]) => {
		if (language === 'English') return [{ language, level }, ...accu];
		return [...accu, { language, level }];
	}, []);
	guideData.images = (() => {
		const images = [];
		let iteration = 0;
		while (images.length < 6) {
			guideData.routes.forEach((route) => {
				if (route.images[iteration]) images.push(route.images[iteration]);
			});
			iteration++;
		}
		return images;
	})();

	const ctaClassName = classNames("button is-size-5 has-text-weight-medium w-100", isSuccessOnHover);

	return <GuideContext.Provider value={guideData}>

		<Hero featuredImage={guideData.featuredImage} />
		<GuideAvatar className="mx-auto" style={{ marginTop: '-3rem' }} {...guideData.avatar} />
		<div className="has-text-centered">
			<PageTitle className="mt-3">{guideData.title}</PageTitle>
		</div>

		<Section className="has-text-centered">
			<Info />
		</Section>

		<Section>
			<SectionTitle>Routes</SectionTitle>
			<Routes noGuide withRating>
				{guideData.routes}
			</Routes>
		</Section>

		<Section>
			<button className={ctaClassName} style={{ textWrap: 'wrap', height: 'auto' }}>
				Get a custom route from {guideData.title}
			</button>
		</Section>

		<Section>
			<SectionTitle aside={guideData.reviews > maxReviewsOutsideModal ? [showAllReviews] : undefined}>Reviews</SectionTitle>
			{guideData.reviews.length
				? <Reviews modalTitle={`Reviews to ${guideData.title}'s routes:`} modalProps={reviewsModal}>{guideData.reviews}</Reviews>
				: <ReviewsEmptyState addReview={console.log} />}
		</Section>

		<Section noTopMargin noSidePadding className="pt-6 mt-6">
			<DelimiterGallery images={guideData.images} />
		</Section>

	</GuideContext.Provider>;

}