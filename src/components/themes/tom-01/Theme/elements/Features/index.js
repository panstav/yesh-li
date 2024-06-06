import classNames from "classnames";

import Section from "@wrappers/Section";
import FlexImage from "@elements/FlexImage";

import VideoEmbed from "@themes/tom-01/Theme/elements/VideoEmbed";

import { singleFeature } from '@themes/tom-01/Theme/index.module.sass';

export default function Features({ children: features, columns = 2 }) {
	return <Section noTopMargin
		className="is-flex is-justify-content-center is-flex-wrap-wrap reset-anchors gap-2" style={{ rowGap: '3rem' }}>

		{features.map(({ title, embedUrl, featuredImage, style, titleClassName: titleClasses, href }) => {
			const titleClassName = classNames('mt-2', titleClasses);
			const Elem = href ? 'a' : 'div';
			const props = href ? { href, style } : { style };
			const className = classNames(singleFeature, `is-${columns}-columns`);
			return <Elem key={title} className={className} {...props}>
				{embedUrl && <VideoEmbed {...{ embedUrl, title, style }} className="has-background-black mt-2" />}
				{featuredImage && <FlexImage {...featuredImage} alt={title} style={{ aspectRatio: '1/1', height: 'auto' }} />}
				<h3 className={titleClassName}>{title}</h3>
			</Elem>;
		})}
	</Section>;
}