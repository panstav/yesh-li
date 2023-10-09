import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import Modal, { useModal } from "@wrappers/Modal";
import { YouTube } from "@elements/Icon";

import { youtubeImageContainer, youtubeThumbnail, youtubeIcon } from './video.module.sass';

export default function Video ({ className }) {
	const { content: { video } } = useContext(PageContext);

	const [youtubeModal, showYoutubeModal] = useModal({
		isRaw: true, isLarge: true
	});

	if (!video.id) return null;

	const youtubeIconClassName = classNames(youtubeIcon, 'is-overlay m-auto');

	return <>

		<div {...{ className }}>
			<div className={youtubeImageContainer} onClick={() => showYoutubeModal()}>
				<img src={video.thumbnail} alt={video.title} className={youtubeThumbnail} />
				<YouTube className={youtubeIconClassName} style={{ width: '3rem', color: 'var(--color-youtube)' }} />
			</div>
		</div>

		<Modal {...youtubeModal} render={() => {
			return <iframe {...video} allowFullScreen style={{ width: "100%", height: "95dvh" }} />;
		}} />

	</>;
}