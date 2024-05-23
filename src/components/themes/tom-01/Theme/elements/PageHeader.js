import classNames from "classnames";

import Section from "@wrappers/Section";
import FlexImage from "@themes/elyse-01/Theme/FlexImage";

export default function PageHeader({ title, subtitle, featuredImage, tags = [], isSmallFeature, className: classes, isSinglePost }) {

	featuredImage.alt |= `${title} - ${subtitle}`;

	const className = classNames('has-text-centered py-6', classes);
	const titleClasses = classNames('title', isSinglePost ? 'is-3 has-text-weight-bold' : 'is-2 is-uppercase');
	const imgStyle = isSmallFeature ? { maxWidth: '350px', maxHeight: '350px' } : { maxWidth: '610px' };

	return <header {...{ className }}>
		<Section noTopMargin className="py-4">
			<h1 className={titleClasses}>{title}</h1>
			{subtitle && <h2 className='subtitle'>{subtitle}</h2>}
			{tags.length > 0 && <div className="tags is-centered has-text-weight-bold reset-anchors">
				<span className="tag is-medium has-text-black" style={{ backgroundColor: 'transparent', border: '0', textDecoration: 'underline' }}>TAGS:</span>
				{tags.map((tag) => {
					return <a key={tag.slug} href={`/blog/tag/${tag.slug}`} className="tag is-medium">
						{tag.title}
					</a>;
				})}
			</div>}
		</Section>
		{featuredImage && <FlexImage
			{...featuredImage}
			className="w-100 mt-5 mx-auto"
			style={imgStyle} />}
	</header>;
}