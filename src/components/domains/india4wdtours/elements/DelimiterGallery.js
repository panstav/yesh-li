import Carousel from "react-multi-carousel";
import classNames from "classnames";

import FlexImage from "@elements/FlexImage";

import parseSrcSet from "@lib/parse-srcset";

import { unconstrainedCarouselContainer } from "@domains/india4wdtours/index.module.sass";

export default function DelimiterGallery({ images }) {
	const carouselClassName = classNames("mt-5 ms-3", unconstrainedCarouselContainer);

	return <Carousel
		infinite
		arrows={false}
		className={carouselClassName}
		responsive={{
			desktop: {
				breakpoint: { max: 3000, min: 1024 },
				items: 3.2,
				slidesToSlide: 1
			},
			tablet: {
				breakpoint: { max: 1024, min: 464 },
				items: 2.2,
				slidesToSlide: 1
			},
			mobile: {
				breakpoint: { max: 464, min: 0 },
				items: 1.2,
				slidesToSlide: 1
			}
		}}>
		{images.map((image) => {
			image.srcSet = parseSrcSet(image.srcSet)[0];
			return <div key={image.srcSet} style={{ pointerEvents: 'none' }}>
				<FlexImage {...image} style={{ aspectRatio: '4/3', maxHeight: '10rem' }} />
			</div>;
		})}
	</Carousel>;
}