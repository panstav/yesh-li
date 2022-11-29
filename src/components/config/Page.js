import { createContext } from "react";

import Meta from "@config/Meta";

export const PageContext = createContext();

export default function Page({ path, config: pageConfig = {}, pageResources = {}, children }) {

	const { title = '', description = '', background } = pageConfig;
	const { page: { componentChunkName } = {} } = pageResources;

	const pageId = componentChunkName.replace(/^component---src-pages-/, '').replace(/-js$/, '');

	return <>
		<Meta {...{ title, description, path }} helmetProps={{
			htmlAttributes: { lang: 'he', dir: 'rtl' },
			bodyAttributes: { 'data-page': pageId }
		}} />

		<Background {...{ background }} />

		<PageContext.Provider value={pageConfig}>
			<main className="pb-3">
				{children}
			</main>
		</PageContext.Provider>
	</>
}

function Background({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}