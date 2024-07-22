import { useCollectionPageContent } from "@hooks/use-site-data";

import SectionTitle from "@domains/india4wdtours/elements/SectionTitle";
import ReviewsList from "@domains/india4wdtours/elements/Reviews";
import { EmptyState } from "@domains/india4wdtours/elements/Reviews";

export default function Reviews({ id }) {
	const { reviews } = useCollectionPageContent();

	return <>
		<SectionTitle id={id}>Reviews</SectionTitle>
		{reviews.length
			? <ReviewsList>{reviews}</ReviewsList>
			: <EmptyState addReview={console.log} />}
	</>;
}