import { Suspense, lazy } from "react";
import Frame from 'react-frame-component';
import { useFormContext } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";

import Loader from "@elements/Loader";

const Elyse_01 = lazy(() => import('@pages/Elyse-01'));

const isProduction = process.env.NODE_ENV === 'production';

let validProps = {};

function Preview(props) {

	const Theme = {
		'elyse-01': Elyse_01
	}[props.theme];

	let styles;

	if (isProduction) {
		const siteAssets = JSON.parse(window.___chunkMapping);
		styles = `<link rel="stylesheet" href="${siteAssets[Object.keys(siteAssets).find((key) => key.includes(props.theme))]
			.find((src) => src.includes('.css'))}">`;
	} else {
		styles = Array.from(document.head.children).filter((elem) => ['LINK', 'STYLE'].includes(elem.nodeName)).map((elem) => elem.outerHTML).join('');
	}

	// set a (except for outbound), button, input, textarea to pointer-events: none
	// set input, textarea to disabled
	const interactionBlocker = `<style>* a:not([href^="https://"]):not([href^="tel:"]):not([href^="mailto:"]), * button, * input, * textarea { pointer-events: none !important; }</style><script defer>const interval = setInterval(function () {const elems = Array.from(document.querySelectorAll('input, textarea'));if (elems.length) {clearInterval(interval);elems.forEach((elem) => elem.setAttribute('disabled', true));}}, 100);</script>`;

	const injection = `<!DOCTYPE html><html dir="rtl" lang="he"><head>${interactionBlocker}${styles}</head><body><div id="mountTarget"></div></body></html>`;

	return <div className='has-strong-radius' style={{ height: '100%', border: '3px solid var(--color-primary)' }}>
		<Frame initialContent={injection} mountTarget='#mountTarget' style={{ width: '100%', height: '100%' }}>
			<Suspense fallback={<Loader />}>
				{props.hasErrors && <p className="has-background-danger has-text-centered has-text-white has-text-weight-bold py-2" style={{ position: 'fixed', top: '0', right: '0', left: '0', zIndex: '1000' }}>התצוגה המקדימה אינה מתעדכנת כאשר יש בעיות בעריכת העמוד</p>}
				<Theme {...props} />
			</Suspense>
		</Frame>
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