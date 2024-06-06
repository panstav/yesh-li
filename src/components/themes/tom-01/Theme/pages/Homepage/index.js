import { usePageContent, useSiteContent } from "@hooks/use-site-data";

import SignupForUpdates from '@themes/tom-01/Theme/elements/SignupForBlog';
import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import DelimiterComponent from "@themes/tom-01/Theme/elements/Delimiter";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";

export default function Homepage() {
	const { featuredImage } = useSiteContent();
	const { title, subtitle, contentHtml } = usePageContent('home');

	return <>
		<PageHeader {...{ title, subtitle, featuredImage }} />

		<Delimiter />

		<SmallSection noTopMargin className="py-6">
			<div className="content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
			<SignupForUpdates className="mt-6" />
		</SmallSection>
		<Delimiter />
	</>;
}

function Delimiter() {
	return <DelimiterComponent style={{ width: '75ch' }} />;
}