import classNames from "classnames";

import { usePageContent } from "@hooks/use-page-data";

import Media from "./Media";
import Details from "./Details";

import { container } from "./index.module.sass";

export default function Alon_1() {
	const content = usePageContent();

	if (content.links) {
		Object.entries(content.links).forEach(([platform, address]) => {
			if (!address) delete content.links[platform];
		});
	}

	if (content.video?.url) {
		const videoId = (new URL(content.video.url)).searchParams.get('v');
		content.video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&cc_lang_pref=he&hl=he&rel=0`;
	}

	if (content.sections) {
		content.sections.forEach((section) => {
			// add a random id to each section to be used as a key
			section.id = Math.random().toString(36).substring(2, 9);
		});
	}

	const containerClassName = classNames(container, "is-flex-direction-row-reverse");

	return <div className={containerClassName}>
		<Media {...content.featuredImage} />
		<Details />
	</div>;
}