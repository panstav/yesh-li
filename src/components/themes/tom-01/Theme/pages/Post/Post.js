import { useCollectionPageContent } from "@hooks/use-site-data";

import SignupForUpdates from "@themes/tom-01/Theme/elements/SignupForBlog";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";
import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Delimiter from "@themes/tom-01/Theme/elements/Delimiter";

export default function Post() {
	const { title, publishDate, tags, featuredImage, contentHtml } = useCollectionPageContent();

	return <>
		<PageHeader title={title} subtitle={publishDate} tags={tags} featuredImage={featuredImage} isSmallFeature isSinglePost />
		<SmallSection withTopMargin={false} style={{ textAlign: 'justify' }}>
			<div className="content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
			<Delimiter className="mt-6" />
			<SignupForUpdates className="mt-6" />
		</SmallSection>
	</>;
}