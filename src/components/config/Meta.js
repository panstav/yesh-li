import { graphql, useStaticQuery } from 'gatsby';

export default function Meta({
	title,
	description,
	pathname,
	featuredImage: pageFeaturedImage,
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

	return <>
		<body data-page={pathname} />

		<title>{pageTitle}</title>
		<meta name="title" content={pageTitle} />
		<meta name="description" content={pageDescription} />

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

		{/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<link rel="manifest" href="/site.webmanifest" />
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
		<meta name="msapplication-TileColor" content="#f7d31e" />
		<meta name="theme-color" content="#ffffff" /> */}
	</>;
}

export function HeadFor(arg) {

	// this HOC will be used to either pass different props like this: HeadFor({ title: 'Homepage' })
	// or to use page data to pass props like this: HeadFor((data) => ({ title: data.pageContext.title }))
	return function Head (data) {

		let props;

		if (typeof (arg) === 'function') {
			props = arg(data);
		} else {
			props = arg;
		}

		return <Meta pathname={data.location.pathname} {...props} />;
	};
}