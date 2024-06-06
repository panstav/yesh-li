import parseSrcSet from "@lib/parse-srcset";

let siteTitle;

// this function is used to set default theme head props
// it wraps the props passed to the head / HeadFor component

export default function wrapHeadProps(perPageArg = {}) {
	return (data) => {

		const { pageContext: { title, content: { featuredImage, pages: { home: { subtitle } } } } } = data;
		const srcs = parseSrcSet(featuredImage.srcSet);

		// set the site title so that wrapTitle can use it
		if (!siteTitle) siteTitle = title;

		const baseProps = {
			lang: "en",
			title: `${title} - ${subtitle}`,
			description: subtitle,
			featuredImage: srcs[srcs.length - 1],
			fontSize: '16px',
			textColor: 'black'
		};

		let pageProps;
		if (typeof (perPageArg) === 'function') {
			pageProps = perPageArg(data, baseProps);
		} else {
			pageProps = perPageArg;
		}

		// ensure none of the pageProps are falsy values
		Object.keys(pageProps).forEach(key => {
			if (!pageProps[key]) delete pageProps[key];
		});

		return {
			...baseProps,
			...pageProps
		};
	};
}

export function wrapTitle(pageTitle) {
	return { title: `${pageTitle} - ${siteTitle}` };
}