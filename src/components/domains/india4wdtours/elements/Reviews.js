import Modal, { Title } from "@wrappers/Modal";
import FlexImage from "@elements/FlexImage";

import RatingStars from "@domains/india4wdtours/elements/RatingStars";

export const maxReviewsOutsideModal = 3;

export default function Reviews({ modalTitle, limit = maxReviewsOutsideModal, modalProps, children: reviews }) {

	const displayedReviews = reviews.slice(0, limit || Infinity);

	return <>
		{displayedReviews.map(Review)}

		<Modal {...modalProps} render={() => <>
			{modalTitle && <Title>{modalTitle}</Title>}
			{reviews.map(Review)}
		</>} />
	</>;
}

export function EmptyState({ addReview }) {
	return <div className="is-flex is-flex-direction-column has-strong-radius has-text-centered px-4 py-6" style={{ border: '0.25rem dashed lightgrey' }}>
		<span className="has-text-grey">Be the first to review and help other travelers make an informed decision</span>
		<button onClick={addReview} className="button mt-4 mx-auto">Share your experience</button>
	</div>;
}

function Review({ routeTitle, rating, timeAgo, user, content }, index) {
	return <div key={index} className="box" style={{ fontSize: '0.8rem' }}>
		{routeTitle && <div className="has-text-grey mb-2">Reviewing route: &quot;{routeTitle}&quot;</div>}
		<div className="is-flex is-align-items-center">
			<FlexImage {...user.avatar} className="me-2" style={{ width: '2rem', height: '2rem', borderRadius: '100%' }} />
			<div className="is-flex is-flex-direction-column">
				<span>{user.name}</span>
				<span>{user.reviews} reviews</span>
			</div>
		</div>
		<div className="is-flex is-align-items-center my-1">
			<RatingStars noTitle rating={rating} className="me-2" iconStyle={{ width: '0.75rem' }} />
			<span style={{ marginTop: '2px' }}>{timeAgo}</span>
		</div>
		<p>{content}</p>
	</div>;
}