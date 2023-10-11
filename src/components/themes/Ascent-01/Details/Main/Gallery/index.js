import { useCallback, useContext, useState } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import Modal, { useModal } from "@wrappers/Modal";
import { Gallery as GalleryIcon } from "@elements/Icon";

import useKeyPress from "@hooks/use-key-press";

import { container, edge } from "./gallery.module.sass";

export default function Gallery({ className }) {
	const { content: { gallery } } = useContext(PageContext);

	const [galleryModal, showGalleryModal] = useModal({
		isRaw: true, isLarge: true
	});

	const containerClassName = classNames(container, "is-relative", className);

	return <>

		<div className={containerClassName} onClick={() => showGalleryModal()}>
			<img {...gallery[0]} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} width={640} height={480} />
			{gallery.length > 1 && <div className="button is-small is-flex is-flex-gap-1 is-align-items-center has-text-weight-medium ps-4" style={{ position: 'absolute', width: 'fit-content' }}>
				<GalleryIcon />
				<span>{gallery.length} תמונות</span>
			</div>}
		</div>

		<Modal {...galleryModal} render={GalleryModal} />

	</>;
}

function GalleryModal() {
	const { content: { gallery } } = useContext(PageContext);

	const [index, setIndex] = useState(0);
	// next goes to the next image, unless it's the last one, in which case it goes to the first one
	const setNext = useCallback(() => setIndex((index + 1) % gallery.length), [index, setIndex]);
	// prev goes to the prev image, unless it's the first one, in which case it goes to the last one
	const setPrev = useCallback(() => setIndex((index - 1 + gallery.length) % gallery.length), [index, setIndex]);

	const isRTL = () => document.documentElement.dir === 'rtl';
	const rightHandler = isRTL ? setNext : setPrev;
	const leftHandler = isRTL ? setPrev : setNext;

	useKeyPress('ArrowLeft', leftHandler);
	useKeyPress('ArrowRight', rightHandler);
	useKeyPress('Space', setNext);

	return <div className="has-background-black">
		<img {...gallery[index]} style={{ width: '100%', objectFit: 'contain', maxHeight: '90dvh' }} />
		{gallery.length > 1 && <>
			<Edge onClick={rightHandler} side="right" />
			<Edge onClick={leftHandler} side="left" />
		</>}
	</div>;
}

const sides = ['right', 'left'];
function Edge ({ onClick, side }) {
	const oppositeSide = sides.find(s => s !== side);
	const edgeClassName = classNames(edge, 'is-overlay is-flex is-justify-content-center is-align-items-center');
	return <div onClick={onClick} className={edgeClassName} style={{ [oppositeSide]: 'unset' }}>
		<span className="arrow" data-side={side} />
	</div>;
}