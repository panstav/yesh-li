import { useCallback, useEffect, useRef } from 'react';

import tippy from 'tippy.js';

import './index.sass';

// prep default options for tippy
const defaults = {
	theme: 'default',
	offset: [0, 13]
};

export default function Tooltip({ children, content, html, onClick, onClickSelector, desktopOnly, ...props }) {

	const ref = useRef(null);

	const handleUnMount = useCallback(toggle => {
		return onClick && ((tippy) => (onClickSelector
			? tippy.popper.querySelector(onClickSelector)
			: tippy)[`${toggle}EventListener`]('click', onClick));
	}, [onClick, onClickSelector]);

	let options = {
		content: html || content,
		allowHTML: !!html,
		interactive: !!onClick,
		onShown: handleUnMount('add'),
		onHidden: handleUnMount('remove')
	};

	if (desktopOnly) options.theme = 'desktop-only';

	useEffect(() => {
		tippy(ref.current.base || ref.current, Object.assign({}, defaults, options));
	}, [ref]);

	return <span ref={ref} {...props}>
		{children}
	</span>;

}