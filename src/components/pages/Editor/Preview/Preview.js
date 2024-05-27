import { Suspense, useEffect, useMemo, useState } from "react";
import Frame from 'react-frame-component';

import Page from "@config/Page";
import { CssVariables } from "@config/Meta";

import Loader from "@elements/Loader";

import useI18n from "@hooks/use-i18n";
import useSiteData from "@hooks/use-site-data";

import getDirByLang from "@lib/get-dir-by-lang";
import { themesMap } from "@themes";

const isProduction = process.env.NODE_ENV === 'production';

export default function Preview({ frameRef, framePath = '', hasErrors, ...props }) {

	const [{ Editor: { Preview: t } }] = useI18n();
	const { lang } = useSiteData();

	const [customComponents, setCustomComponents] = useState();
	const initialContent = useMemo(() => getInitialContent({ lang, theme: props.theme }), [lang, props.theme]);

	const ThemedPage = themesMap[`${props.theme}${framePath}`];
	const location = { pathname: framePath === '' ? '/' : framePath };

	return <>
		<div className='iframe-container is-relative' style={{ height: '100%' }}>
			<Frame ref={frameRef} data-path={framePath} initialContent={initialContent} mountTarget='#mountTarget' style={{ width: '100%', height: '100%' }}><>
				{hasErrors && <p className="has-background-danger has-text-centered has-text-white has-text-weight-bold py-2" style={{ position: 'fixed', top: '0', right: '0', left: '0', zIndex: '1000' }}>{t.no_preview_while_invalid}</p>}
				<CssVariables mainColorName={props.mainColor} />
				<Page {...{ location, customComponents }} pageContext={props}>
					<Suspense fallback={<Loader />}>

						<CustomComponentsSetter />
						<ThemedPage {...props} />

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
			const customComponents = ThemedPage?._payload?._result?.default?.customComponents;
			if (!customComponents) return;
			setCustomComponents(customComponents);
		}, [ThemedPage?._payload?._status]);

		return null;
	}
}

function getInitialContent({ theme, lang }) {

	const styles = (() => {
		if (isProduction) {
			const siteAssets = JSON.parse(window.___chunkMapping);
			return `<link rel="stylesheet" href="${siteAssets.app.find((src) => src.includes('.css'))}"><link rel="stylesheet" href="${siteAssets[Object.keys(siteAssets).find((key) => key.includes(theme))].find((src) => src.includes('.css'))}">`;
		} else {
			return Array.from(document.head.children).filter((elem) => ['LINK', 'STYLE'].includes(elem.nodeName)).map((elem) => elem.outerHTML).join('');
		}
	})();

	// set a (except for outbound), button, input, textarea to pointer-events: none, unless they have data-allow-events attribute
	// set input, textarea to disabled
	const interactionBlocker = `<style>* a:not([href^="https://"]):not([href^="tel:"]):not([href^="mailto:"]):not([data-allow-events]), * button:not([data-allow-events]), * label:not([data-allow-events]), * input:not([data-allow-events]), * textarea:not([data-allow-events]) { pointer-events: none !important; }</style><script defer>const observer = new MutationObserver(disableFields);const interval = setInterval(disableFields, 100);function disableFields() {const elems = Array.from(document.querySelectorAll('input, textarea'));if (elems.length) {clearInterval(interval);elems.forEach((elem) => elem.setAttribute('disabled', true));observer.observe(document.querySelector('#modal-root'), { childList: true });}}</script>`;

	return `<!DOCTYPE html><html dir="${getDirByLang(lang)}" lang="${lang}"><head>${interactionBlocker}${styles}</head><body><div id="mountTarget"></div></body></html>`;
}