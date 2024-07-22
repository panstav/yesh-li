import FlexImage from "@elements/FlexImage";

import { useDomainPageContent } from "@hooks/use-site-data";

export default function Featured() {
	// const { featuredProviders } = useDomainPageContent('home');
	const featuredProviders = [];
	return featuredProviders.map(({ name, featuredImage, yearsExperience, isCertified, reviews }) => {
		return <div key={name}>
			<h2>{name}</h2>
			<FlexImage {...featuredImage} />
			<p>{yearsExperience} years of experience</p>
			{isCertified && <p>Certified</p>}
			<Reviews>{reviews}</Reviews>
		</div>;
	});
}

function Reviews({ children: reviews }) {
	const sum = reviews.reduce((acc, review) => acc + review, 0);
	const average = sum / reviews.length;
	return <p>{average} stars with {reviews.length} reviews</p>;
}