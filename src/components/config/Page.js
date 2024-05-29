import { createContext } from 'react';

import RenderChildren from '@wrappers/RenderChildren';

const isProduction = process.env.NODE_ENV === 'production';

export const PageContext = createContext();

export default function Page({ location, pageContext, customComponents = {}, background, children }) {
	const { Header = Null, Footer = Null, Background = FallbackBackground } = customComponents;

	// if we're in development, we'll set the parentDomain on the global object, because it might not be available as soon as the page loads
	if (!isProduction) window.parentDomain = pageContext.parentDomain;

	// have the location available in the page context
	pageContext.location = location;

	return <PageContext.Provider value={pageContext}>

		{/* theme-specific global styles */}
		<style dangerouslySetInnerHTML={{ __html: pageContext.globalStyles || '' }} />

		<Background {...{ background }} />

		<Header />
		{children}
		<Footer />

		<div id="modal-root" />

	</PageContext.Provider>;
}

export function wrapPageElement({ element, props }) {
	const Wrapper = element?.type?.Wrapper || RenderChildren;
	const customComponents = element?.type?.customComponents;

	return <Wrapper>
		<Page {...{
			...props,
			customComponents,
			// a reminiscence of the old code, required for shila's theme
			...element.type.config,
		}}>
			{element}
		</Page>
	</Wrapper>;
}

function FallbackBackground({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}

function Null () {
	return null;
}