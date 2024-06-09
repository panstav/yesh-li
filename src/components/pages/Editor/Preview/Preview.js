import { Suspense, useContext, useEffect, useState } from "react";
import Frame from 'react-frame-component';

import Page from "@config/Page";
import { CssVariables } from "@config/Meta";

import Loader from "@elements/Loader";

import useI18n from "@hooks/use-i18n";

import { EditorContext } from "@pages/Editor";
import { domainsMap } from "@domains";
import { themesMap } from "@themes";

export default function Preview({ frameRef, framePath = '', hasErrors, initialContent, pageContext }) {

	const [{ Editor: { Preview: t } }] = useI18n();
	const { domainControl } = useContext(EditorContext);

	const [customComponents, setCustomComponents] = useState();

	// get the correct page component based on the theme and the path
	const PreviewPage = domainControl
		? domainsMap[`${pageContext.domain}${framePath}`]
		: themesMap[`${pageContext.theme}${framePath}`];

	// normalize the location object to show the correct path for the homepage of the theme
	const location = { pathname: framePath === '' ? '/' : framePath };

	return <>
		<div className='iframe-container is-relative' style={{ height: '100%' }}>

			{/* Loader is used to show a spinner while the iframe is hidden during navigation */}
			<Loader />

			<Frame ref={frameRef} data-path={framePath} initialContent={initialContent} mountTarget='#mountTarget' style={{ width: '100%', height: '100%', position: 'relative' }}><>
				{hasErrors && <p className="has-background-danger has-text-centered has-text-white has-text-weight-bold py-2" style={{ position: 'fixed', top: '0', right: '0', left: '0', zIndex: '1000' }}>{t.no_preview_while_invalid}</p>}
				<CssVariables mainColorName={pageContext.mainColor} />
				<Page {...{ location, customComponents, pageContext }}>
					<Suspense fallback={<Loader />}>

						<CustomComponentsSetter />
						<PreviewPage {...pageContext} />

					</Suspense>
				</Page>
			</></Frame>
		</div>
	</>;

	function CustomComponentsSetter() {
		// this component renders only when ThemedPage is loaded
		// only then do we have access to the custom components
		// so we'll set them here to rerender the page with the correct components

		useEffect(() => {
			const customComponents = PreviewPage?._payload?._result?.default?.customComponents;
			if (!customComponents) return;
			setCustomComponents(customComponents);
		}, [PreviewPage?._payload?._status]);

		return null;
	}
}