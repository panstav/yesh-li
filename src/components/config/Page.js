import { createContext, createElement } from 'react';

export const PageContext = createContext();

export default function Page({ pageContext, children }) {
	return <PageContext.Provider value={pageContext}>
		{children}
		<div id="modal-root" />
	</PageContext.Provider>;
}

export function wrapPageElement({ element, props }) {
	return createElement(Page, props, element);
}