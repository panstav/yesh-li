import { HeadFor } from "@config/Meta";
import Page from "@themes/ayelet-01/Theme";

export const Head = HeadFor(({ pageContext: { content: { description, featuredImage } } }) => {
	return {
		preload: [{ href: featuredImage.src, as: 'image' }],
		description,
		featuredImage: featuredImage.src
	};
});

export default function Ayelet_01({ pageContext: { content } }) {
	return Page({ content });
}