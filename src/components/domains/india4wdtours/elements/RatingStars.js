import OutboundLink from "@elements/OutboundLink";

import { HalfStar, Star } from "@domains/india4wdtours/elements/Icon";

export default function RatingStars({ href, rating = 0, title = `Average review rating: ${rating} / 5 stars`, noTitle, className, containerStyle = {}, iconStyle = {} }) {
	if (typeof title === 'function') title = title(rating);

	const Wrapper = !href ? 'div' : href.startsWith('http') ? OutboundLink : 'a';
	const wrapperProps = {
		className,
		style: {
			textWrap: 'nowrap',
			...containerStyle
		}
	};
	if (!noTitle) wrapperProps.title = title;
	if (href) wrapperProps.href = href;

	const roundedRating = Math.round(rating * 2) / 2;

	return <Wrapper {...wrapperProps}>
		{Array.from({ length: 5 }).reduce((accu, item, index) => {
			if (index + 1 <= roundedRating) accu.push(Star);
			else if (index < roundedRating) accu.push(HalfStar);
			return accu;
		}, []).map((Icon, index) => <Icon key={index} style={iconStyle} />)}
	</Wrapper>;
}