import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";

import useSiteData from "@hooks/use-site-data";

import getDirByLang from "@lib/get-dir-by-lang";

import Preview from "./Preview";
import useNavigationWorkaround from "./use-navigation-workaround";

const isProduction = process.env.NODE_ENV === 'production';

let validProps = {};

export default function PreviewWrapper() {

	const { lang, globalStyles } = useSiteData();

	const hasErrors = useEditorValidation();

	const { framePath, frameRef, renderAllowed } = useNavigationWorkaround({ theme: validProps.theme });

	// creating the initial content for the iframe is somewhat expensive so we'll memoize it here to calculate it only once
	const initialContent = useMemo(() => getInitialContent({ lang, theme: validProps.theme }), []);

	if (!renderAllowed) return null;

	return <Preview key={framePath} {...{
		frameRef,
		framePath,
		hasErrors,
		initialContent,
		pageContext: { ...validProps, globalStyles }
	}} />;
}

function useEditorValidation () {
	const { formState: { errors } } = useFormContext();

	const hasErrors = !!Object.keys(errors).length;

	// if we're certain that props are clean, use them in the next render of Preview
	// otherwise the use the last clean props
	const currentValues = useWatch();
	if (!hasErrors) validProps = cloneDeep(currentValues);

	return hasErrors;
}

function getInitialContent({ theme, lang }) {

	const styles = (() => {

		// in development gatsby injects all styles in the head so we'll just grab them all
		if (!isProduction) return Array.from(document.head.children).filter((elem) => ['LINK', 'STYLE'].includes(elem.nodeName)).map((elem) => elem.outerHTML).join('');

		// in production we only want to load the css assets that are relevant to the theme
		const allAssets = JSON.parse(window.___chunkMapping);
		const assetsToLoad = Object.keys(allAssets).reduce((accu, key) => {
			if (
				// include the common css assets
				key === 'app'
				// include theme-specific assets
				|| key.includes(`component---src-components-themes-${theme}-theme`)) {

				accu.push(...allAssets[key].filter((src) => src.includes('.css')));
			}
			return accu;
		}, []);

		return `${assetsToLoad.map((src) => `<link rel="stylesheet" href="${src}">`).join('')}`;
	})();

	// hide the iframe on clicking any element that has data-hide-all-onclick attribute, this is to avoid the flicker from the iframe navigating to the actual page and then being the Preview component being restarted to have the controlled page showing inside the iframe
	const navigationHider = `if (document.body && !document.body?.onclick) document.body.onclick = (event) => {if (event.target.closest('[data-allow-events]').getAttribute('data-hide-all-onclick')) {Array.from(parent.document.getElementsByTagName('iframe'))[0].setAttribute('hidden', true);}};`;
	// set a (except for outbound), button, input, textarea to pointer-events: none, unless they have data-allow-events attribute
	const fieldsDisabler = `<style>* a:not([href^="https://"]):not([href^="tel:"]):not([href^="mailto:"]):not([data-allow-events]), * button:not([data-allow-events]), * label:not([data-allow-events]), * input:not([data-allow-events]), * textarea:not([data-allow-events]) { pointer-events: none !important; }</style>`;
	// set input, textarea to disabled, ensure that any future modals will also have their inputs disabled
	const interactionBlocker = `${fieldsDisabler}<script defer>const observer = new MutationObserver(disableFields);const interval = setInterval(disableFields, 100);function disableFields() {${navigationHider}const elems = Array.from(document.querySelectorAll('input, textarea'));if (elems.length) {clearInterval(interval);elems.forEach((elem) => elem.setAttribute('disabled', true));observer.observe(document.querySelector('#modal-root'), { childList: true });}}</script>`;

	return `<!DOCTYPE html><html dir="${getDirByLang(lang)}" lang="${lang}"><head>${interactionBlocker}${styles}</head><body><div id="mountTarget"></div></body></html>`;
}