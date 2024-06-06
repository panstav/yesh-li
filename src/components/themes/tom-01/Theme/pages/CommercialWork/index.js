import { usePageContent } from "@hooks/use-site-data";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Features from "@themes/tom-01/Theme/elements/Features";

import videoUrlToEmbedUrl from "@themes/tom-01/Theme/lib/video-url-to-embed-url";

export default function CommercialWork() {
	const { title, subtitle, works } = usePageContent('commercialWork');

	works.map((work) => {
		work.embedUrl = videoUrlToEmbedUrl(work.embedUrl);
	});

	return <>
		<PageHeader {...{ title, subtitle }} />
		<Features columns={2}>{works}</Features>
	</>;
}