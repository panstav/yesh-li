import { createElement } from 'react';

export default function Page({ background, children }) {

	return <>
		<Background {...{ background }} />
		{children}
		<div id="modal-root" />
	</>;
}

export function wrapPageElement({ element, props }) {
	return createElement(Page, { ...element.type.config, ...props }, element);
}

function Background({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}