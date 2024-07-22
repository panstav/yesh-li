import Icon from '@elements/Icon/Icon';
import FlexImage from "@elements/FlexImage";

import Hero from "@domains/india4wdtours/elements/Hero";

import { useCollectionPageContent } from "@hooks/use-site-data";
import { wrapPage } from "@domains/india4wdtours";

const icons = {
	spirit: Icon,
	history: Icon,
	nature: Icon,
	culinary: Icon,
	wildlife: Icon,
	village: Icon
};

export default wrapPage(DestinationPage);

function DestinationPage() {
	const { title, subtitle, featuredImage } = useCollectionPageContent();

	// const destinationCards = useDomainContent().destinations
	// 	.map(({ title, subtitle, featuredImage, description, attractionTypes }) => ({
	// 		title,
	// 		subtitle,
	// 		description,
	// 		image: featuredImage,
	// 		icon: icons[attractionTypes.find((attractionType) => attractionType.title === title).slug || attractionTypes[0].slug]
	// 	}));

	return <>
		<Hero isBackgroundDark {...{ title, subtitle, featuredImage }} cta={{ label: 'Get quotes', href: "/" }} />
	</>;
}

function Card({ title, subtitle, description, image, icon: Icon }) {
	return <div className="card">
		<div className="card-image is-relative">
			<figure className="image is-4by3">
				<FlexImage {...image} />
			</figure>
		</div>
		<div className="card-content">
			<div className="media">
				<div className="media-left">
					<figure className="image is-48x48">
						<Icon />
					</figure>
				</div>
				<div className="media-content">
					<p className="title is-4">{title}</p>
					{title && <p className="subtitle is-6">{subtitle}</p>}
				</div>
			</div>
			<div className="content">
				{description}
			</div>
		</div>
	</div>;
}