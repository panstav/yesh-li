import Meta from "@config/Meta";

export default function Page({ path, config: pageConfig = {}, pageResources = {}, children }) {

	const { title = '', description = '' } = pageConfig;
	const { page: { componentChunkName } = {} } = pageResources;

	const pageId = componentChunkName.replace(/^component---src-pages-/, '').replace(/-js$/, '');

	return <>
		<Meta {...{ title, description, path }} helmetProps={{
			htmlAttributes: { lang: 'he', dir: 'rtl' },
			bodyAttributes: { 'data-page': pageId }
		}} />

		{children}
	</>
}