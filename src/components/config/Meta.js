import { graphql, useStaticQuery } from 'gatsby';

import pallatte from '@lib/pallatte';

const isRemote = !process.env.GATSBY_IS_LOCAL;

export default function Meta({
	title,
	description,
	pathname,
	featuredImage: pageFeaturedImage,
	mainColorName, mainColorHex,
	isInternal,
	hasAdvancedSeo = true
}) {

	const { site: { siteMetadata: { siteUrl, title: siteTitle, description: siteDescription } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
					title
					description
				}
			}
		}
	`);

	const normalizedDescription = Array.isArray(description) ? description.join(' ') : description;

	const pageTitle = title || siteTitle;
	const pageDescription = normalizedDescription || siteDescription;
	const pagePathname = siteUrl + pathname;
	const pageShortUrl = ((shortUrl) => {
		return `${shortUrl}${shortUrl.endsWith('/') ? '' : '/'}`;
	})(pagePathname.slice(pagePathname.indexOf('://') + 3));

	mainColorHex = mainColorHex || pallatte.getColor(mainColorName);

	return <>
		<title>{pageTitle}</title>
		<meta name="title" content={pageTitle} />
		<meta name="description" content={pageDescription} />

		{!isInternal && <>
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pagePathname} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={pageDescription} />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={pagePathname} />
			<meta property="twitter:title" content={pageTitle} />
			<meta property="twitter:description" content={pageDescription} />

			{pageFeaturedImage && <>
				<meta property="og:image" content={pageFeaturedImage} />
				<meta property="twitter:image" content={pageFeaturedImage} />
			</>}

			{(isRemote && hasAdvancedSeo) && <>
				<link rel="manifest" href={`${padEnd(pagePathname, '/')}manifest.json`} />

				<meta name="apple-mobile-web-app-title" content={siteTitle} />
				<meta name="application-name" content={siteTitle} />
				<link rel="apple-touch-icon" sizes="180x180" href={`https://storage.googleapis.com/cloudicon/${pageShortUrl}apple-touch-icon.png`} />
				<link rel="icon" type="image/png" sizes="32x32" href={`https://storage.googleapis.com/cloudicon/${pageShortUrl}favicon-32x32.png`} />
				<link rel="icon" type="image/png" sizes="16x16" href={`https://storage.googleapis.com/cloudicon/${pageShortUrl}favicon-16x16.png`} />
				<link rel="shortcut icon" href={`https://storage.googleapis.com/cloudicon/${pageShortUrl}favicon.ico`} />
				<meta name="msapplication-TileColor" content={`#${mainColorHex}`} />
				<meta name="theme-color" content={`#${mainColorHex}`} />
			</>}
		</>}

		<CssVariables {...{ mainColorName, mainColorHex }} />
	</>;
}

export function HeadFor(arg) {

	// this HOC will be used to either pass different props like this: HeadFor({ title: 'Homepage' })
	// or to use page data to pass props like this: HeadFor((data) => ({ title: data.pageContext.title }))
	return function Head (data) {

		let args;

		if (typeof (arg) === 'function') {
			args = arg(data);
		} else {
			args = arg;
		}

		const { preload, children, ...props } = args;

		return <>
			{preload && preload.map((preload) => <link rel="preload" key={preload.href} {...preload} />)}

			<Meta
				pathname={data.location.pathname}
				title={data.pageContext.title}
				mainColorName={data.pageContext.mainColor}
				{...props}
			/>

			{children}
		</>;
	};
}

export function internalPageTitle (title) {
	return { title: `${title} • יש.לי` };
}

export function CssVariables ({ mainColorName, mainColorHex }) {
	return <style>{`:root { accent-color: var(--color-primary); ${pallatte.getVariables(mainColorName)} ${!mainColorName ? `--color-primary: #${mainColorHex};` : ''} }`}</style>;
}

function padEnd (str, char) {
	return str.endsWith(char) ? str : `${str}${char}`;
}