import { HeadFor } from "@config/Meta";

import parseSrcSet from "@lib/parse-srcset";

export { default } from "@themes/alon-01/Theme";

export const Head = HeadFor(({ pageContext: { content: { description, featuredImage } } }) => {
	const srcs = parseSrcSet(featuredImage.srcSet);
	return {
		preload: [{ href: srcs[0], as: 'image' }, { href: srcs[1], as: 'image' }],
		description,
		featuredImage: srcs[srcs.length - 1]
	};
});