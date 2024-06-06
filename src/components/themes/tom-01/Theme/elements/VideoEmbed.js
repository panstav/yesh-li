import classNames from "classnames";

export default function VideoEmbed({ className: classes, title, embedUrl }) {
	const className = classNames("video is-relative", classes);
	return <div {...{ className }} style={{ paddingBottom: "56.25%" /* 16:9 */, paddingTop: 25, height: 0, border: 0 }} >
		<iframe style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} src={embedUrl} title={title} allowFullScreen />
	</div>;
}