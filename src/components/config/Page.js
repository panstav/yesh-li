import { createContext, createElement } from 'react';

export const PageContext = createContext();

export default function Page({ pageContext, background, children }) {
	return <PageContext.Provider value={pageContext}>
		<Background {...{ background }} />
		{children}
		<div id="modal-root" />
	</PageContext.Provider>;
}

export function wrapPageElement({ element, props }) {
	return createElement(Page, {
		// downstream props
		...props,
		// a reminiscence of the old code, required for shila's theme
		...element.type.config,
	}, element);
}

function Background({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}