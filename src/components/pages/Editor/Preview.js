import { Suspense } from "react";
import Frame from 'react-frame-component';
import { useFormContext } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";

import useI18n from "@hooks/use-i18n";
import useSiteData from "@hooks/use-site-data";

import Page from "@config/Page";
import { CssVariables } from "@config/Meta";
import Loader from "@elements/Loader";

import { themesMap } from "@themes";
import getDirByLang from "@lib/get-dir-by-lang";

const isProduction = process.env.NODE_ENV === 'production';

let validProps = {};

function Preview(props) {

	const [{ Editor: { Preview: t } }] = useI18n();
	const { lang } = useSiteData();

	const Theme = themesMap[props.theme];

	let styles;

	if (isProduction) {
		const siteAssets = JSON.parse(window.___chunkMapping);
		styles = `<link rel="stylesheet" href="${siteAssets.app.find((src) => src.includes('.css'))}"><link rel="stylesheet" href="${siteAssets[Object.keys(siteAssets).find((key) => key.includes(props.theme))].find((src) => src.includes('.css'))}">`;
	} else {
		styles = Array.from(document.head.children).filter((elem) => ['LINK', 'STYLE'].includes(elem.nodeName)).map((elem) => elem.outerHTML).join('');
	}

	// set a (except for outbound), button, input, textarea to pointer-events: none
	// set input, textarea to disabled
	const interactionBlocker = `<style>* a:not([href^="https://"]):not([href^="tel:"]):not([href^="mailto:"]), * button, * label, * input, * textarea { pointer-events: none !important; }</style><script defer>const observer = new MutationObserver(disableFields);const interval = setInterval(disableFields, 100);function disableFields() {const elems = Array.from(document.querySelectorAll('input, textarea'));if (elems.length) {clearInterval(interval);elems.forEach((elem) => elem.setAttribute('disabled', true));observer.observe(document.querySelector('#modal-root'), { childList: true });}}</script>`;

	const injection = `<!DOCTYPE html><html dir="${getDirByLang(lang)}" lang="${lang}"><head>${interactionBlocker}${styles}</head><body><div id="mountTarget"></div></body></html>`;

	return <div className='iframe-container is-relative' style={{ height: '100%' }}>
		<Frame initialContent={injection} mountTarget='#mountTarget' style={{ width: '100%', height: '100%' }}><>
			{props.hasErrors && <p className="has-background-danger has-text-centered has-text-white has-text-weight-bold py-2" style={{ position: 'fixed', top: '0', right: '0', left: '0', zIndex: '1000' }}>{t.no_preview_while_invalid}</p>}
			<CssVariables mainColorName={props.mainColor} />
			<Page pageContext={props}>
				<Suspense fallback={<Loader />}>
					<Theme {...props} />
				</Suspense>
			</Page>
		</></Frame>
	</div>;
}

export default function PreviewGate() {
	const { getValues, watch, formState: { errors, isValidating } } = useFormContext();
	watch();

	const hasErrors = !!Object.keys(errors).length;
	// if we're certain that props are clean, use them in the next render of Preview
	if (!hasErrors && !isValidating) validProps = cloneDeep(getValues());

	// otherwise the use the last clean props
	return <Preview {...validProps} hasErrors={hasErrors} />;
}