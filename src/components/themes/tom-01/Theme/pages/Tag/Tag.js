import { useCollectionPageContent, useSiteContent } from "@hooks/use-site-data";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Posts from "@themes/tom-01/Theme/elements/Posts";

import getPostsByTag from "@themes/tom-01/Theme/lib/get-posts-by-tag";

export default function Tag() {
	const { collectionPages: { tag: tags, post: posts } } = useSiteContent();
	const { title } = useCollectionPageContent();

	return <>
		<PageHeader title={`Tag: ${title}`} />
		<Posts posts={getPostsByTag(posts, { title })} tags={tags} />
	</>;
}