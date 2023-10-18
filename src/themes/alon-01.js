import { HeadFor } from "@config/Meta";
import Page from "@themes/Alon-01";

export const Head = HeadFor(({ pageContext: { content: { description, featuredImage } } }) => {
	const featuredImageSrcs = featuredImage.srcSet.split(', ');
	return {
		preload: [{ href: featuredImageSrcs[0].split(' ')[0], as: 'image' }],
		description,
		featuredImage: featuredImageSrcs.slice(-1)[0].split(' ')[0]
	};
});

export default function Alon_01({ pageContext: { content } }) {
	return Page({ content });
}