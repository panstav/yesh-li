import { HeadFor } from "@config/Meta";

import parseSrcSet from "@lib/parse-srcset";

export { default } from "./Theme";

export const Head = HeadFor(({ pageContext: { title, content: { description, featuredImage } } }) => {
	const srcs = parseSrcSet(featuredImage.srcSet);
	return {
		preload: [{ href: srcs[0], as: 'image' }, { href: srcs[1], as: 'image' }],

		title,
		description,
		featuredImage: srcs[srcs.length - 1]
	};
});