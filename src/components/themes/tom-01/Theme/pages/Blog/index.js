import { usePageContent } from "@hooks/use-site-data";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Posts from "@themes/tom-01/Theme/elements/Posts";

export default function Blog() {
	const { title, subtitle } = usePageContent('blog');
	return <>
		<PageHeader {...{ title, subtitle }} />
		<Posts  />
	</>;
}