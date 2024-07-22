import parseSrcSet from "@lib/parse-srcset";

import { I18nProvider } from "@config/I18n";
import ErrorModalProvider from "@wrappers/ErrorModalProvider";

import Header from './config/Header';
import Footer from './config/Footer';

import i18n from './i18n';
import domainData from './index.json';

export const domainProps = {
	...domainData
};

export function wrapPage(Page, { i18nOnly } = {}) {
	if (!i18nOnly) Page.customComponents = { Header, Footer };

	Page.Wrapper = function Wrapper({ children }) {
		return <I18nProvider {...{ i18n }}>
			<ErrorModalProvider>
				{children}
			</ErrorModalProvider>
		</I18nProvider>;
	};

	return Page;
}

export function wrapTitle(title, { flip } = {}) {
	const domainName = domainData.title;
	const first = flip ? domainName : title;
	const second = flip ? title : domainName;
	return { title: `${first} • ${second}` };
}

export function wrapHeadProps(perPageArg = {}) {
	return (data) => {

		const { pageContext: { content: { pages: { home: { featuredImage: featuredImageObj, subtitle } } } } } = data;
		const featuredImageSrc = parseSrcSet(featuredImageObj.srcSet)[0];

		const baseProps = {
			lang: "en",
			description: subtitle,
			featuredImage: featuredImageSrc,
			mainColorHex: domainData.mainColorHex,
			...wrapTitle(domainData.subtitle, { flip: true })
		};

		let pageProps;
		if (typeof (perPageArg) === 'function') {
			pageProps = perPageArg(data, baseProps);
		} else {
			pageProps = perPageArg;
		}

		// ensure none of the pageProps are falsy values - for example, a page could try to set a subtitle to be the description, but if no subtitle is provided, it should not overwrite the base description
		Object.keys(pageProps).forEach(key => {
			if (!pageProps[key]) delete pageProps[key];
		});

		return {
			...baseProps,
			...pageProps
		};
	};
}