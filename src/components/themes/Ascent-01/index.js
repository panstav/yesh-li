import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";

import Media from "./Media";
import Details from "./Details";

import { container } from "./index.module.sass";

export default function Ascent_1() {
	const { content } = useContext(PageContext);

	Object.entries(content.links).forEach(([platform, address]) => {
		if (!address) delete content.links[platform];
	});

	if (content.video?.url) {
		const videoId = (new URL(content.video.url)).searchParams.get('v');
		content.video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&cc_lang_pref=he&hl=he&rel=0`;
		content.video.thumbnail = "https://img.youtube.com/vi/" + videoId + "/sddefault.jpg";
	}

	content.sections.forEach((section) => {
		// add a random id to each section
		section.id = Math.random().toString(36).substring(2, 9);
	});

	const containerClassName = classNames(container, "is-flex-direction-row-reverse");

	return <div className={containerClassName}>
		<Media {...content.featuredImage} />
		<Details />
	</div>;
}