import useSiteData, { usePageContent } from "@hooks/use-site-data";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Features from "@themes/tom-01/Theme/elements/Features";
import getCollectionPagePrefix from "@lib/get-collection-page-prefix";

export default function Portfolio() {
	const { title, subtitle } = usePageContent('portfolio');
	const { theme, content: { collectionPages: { portfolio: posts } } } = useSiteData();

	const blogPostsPrefix = getCollectionPagePrefix(theme, 'portfolio');

	const portfolio = posts.map(({ title, slug, images }) => ({
		title,
		titleClassName: 'has-text-centered has-text-weight-bold has-text-black',
		featuredImage: images.find(({ isFeatured }) => isFeatured)?.image || images[0].image,
		href: `/${blogPostsPrefix}/${slug}`
	}));

	return <>
		<PageHeader {...{ title, subtitle }} />
		<Features columns={3}>{portfolio}</Features>
	</>;
}