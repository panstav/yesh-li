import { HeadFor } from "@config/Meta";

import getCollectionPage from "@lib/get-collection-page";
import parseSrcSet from "@lib/parse-srcset";

import { wrapHeadProps, wrapTitle } from "@domains/india4wdtours";

export default HeadFor(wrapHeadProps(({ location: { pathname }, pageContext: { content: { collectionPages } } }) => {
	const collectionPage = getCollectionPage(collectionPages, pathname);
	const featuredImage = parseSrcSet(collectionPage.featuredImage.srcSet);
	return {
		...wrapTitle(collectionPage.title),
		description: collectionPage.subtitle,
		featuredImage
	};
}));