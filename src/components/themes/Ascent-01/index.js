import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";

import Media from "./Media";
import Details from "./Details";

import { container } from "./index.module.sass";

export default function Ascent_1() {
	const { content } = useContext(PageContext);

	content.links.map(({ address }, index, arr) => {
		if (!address) delete arr[index];
	});

	content.video.src = `https://www.youtube.com/embed/${content.video.id}?autoplay=1&cc_lang_pref=he&hl=he&rel=0`;
	content.video.thumbnail = "https://img.youtube.com/vi/" + content.video.id + "/sddefault.jpg";

	const containerClassName = classNames(container, "is-flex-direction-row-reverse");

	return <div className={containerClassName}>
		<Media {...content.featuredImage} />
		<Details />
	</div>;
}