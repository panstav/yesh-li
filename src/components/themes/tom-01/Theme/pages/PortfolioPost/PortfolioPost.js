import LazyImage from "@elements/LazyImage";

import { useCollectionPageContent } from "@hooks/use-site-data";

import SignupForUpdates from "@themes/tom-01/Theme/elements/SignupForBlog";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";
import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Delimiter from "@themes/tom-01/Theme/elements/Delimiter";

import { imageInViewport } from '@themes/tom-01/Theme/index.module.sass';
import classNames from "classnames";

export default function PortfolioPost() {
	const { title, images } = useCollectionPageContent();

	const imageClassName = classNames('my-5', imageInViewport);

	return <>
		<PageHeader title={title} />
		<SmallSection noTopMargin style={{ textAlign: 'justify' }}>
			{images.map(({ image }) => <LazyImage key={image.srcSet} {...image} className={imageClassName} />)}
			<Delimiter className="mt-6" />
			<SignupForUpdates className="mt-6" />
		</SmallSection>
	</>;
}