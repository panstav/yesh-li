// calculate average review rating, limit to 1 decimal place
export default function calcRating(reviews) {
	if (!reviews.length) return 0;
	return Math.round(reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length * 10) / 10;
}