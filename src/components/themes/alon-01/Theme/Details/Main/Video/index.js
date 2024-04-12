import classNames from "classnames";

import { usePageContent } from "@hooks/use-page-data";

import Modal, { useRawModal } from "@wrappers/Modal";
import { YouTube } from "@elements/Icon";

import { youtubeImageContainer, youtubeThumbnail, youtubeIcon } from './video.module.sass';

export default function Video ({ className }) {
	const { video } = usePageContent();

	const [youtubeModal, showYoutubeModal] = useRawModal({
		isLarge: true
	});

	if (!video?.url) return null;

	const youtubeIconClassName = classNames(youtubeIcon, 'is-overlay m-auto');

	return <>

		<div {...{ className }}>
			<div className={youtubeImageContainer} onClick={() => showYoutubeModal()}>
				<img src={video.thumbnail} loading="lazy" alt={video.title} className={youtubeThumbnail} width={640} height={480} />
				<YouTube className={youtubeIconClassName} style={{ width: '3rem', color: 'var(--color-youtube)' }} />
			</div>
		</div>

		<Modal {...youtubeModal} render={() => {
			return <iframe {...video} allowFullScreen style={{ width: "100%", height: "min(95dvh, 100vw)" }} />;
		}} />

	</>;
}