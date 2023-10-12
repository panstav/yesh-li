import { HeadFor } from "@config/Meta";
import Page from "@themes/Alon-01";

export const Head = HeadFor(({ pageContext: { content: { fullName, description, occupation, featuredImage } } }) => {
	return {
		_preload: [{ href: featuredImage.srcSet.split(' ')[0], as: 'image' }],
		title: `${occupation} • ${fullName}`,
		description,
		featuredImage
	};
});

export default function Alon_01({ pageContext: { content } }) {
	return Page({ content });
}