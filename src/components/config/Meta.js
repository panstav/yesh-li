import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import isBrowser from '@lib/is-browser';

export default function Meta({
	path,
	title = '',
	description = '',
	// featuredImage: pageFeaturedImage = '',
	helmetProps
}) {

	const { site: { siteMetadata: { title: siteTitle, description: siteDescription } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	const pageTitle = title || siteTitle;
	const pageDescription = description || siteDescription;
	const pathname = isBrowser() ? window.location.origin + path : path;

	return <Helmet {...helmetProps}>
		<title>{pageTitle}</title>
		<meta name="title" content={pageTitle} />
		<meta name="description" content={pageDescription} />

		<meta property="og:type" content="website" />
		<meta property="og:url" content={pathname} />
		<meta property="og:title" content={pageTitle} />
		<meta property="og:description" content={pageDescription} />
		{/* <meta property="og:image" content={pageFeaturedImage} /> */}
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content={pathname} />
		<meta property="twitter:title" content={pageTitle} />
		<meta property="twitter:description" content={pageDescription} />
		{/* <meta property="twitter:image" content={pageFeaturedImage} /> */}

		{/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<link rel="manifest" href="/site.webmanifest" />
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
		<meta name="msapplication-TileColor" content="#f7d31e" />
		<meta name="theme-color" content="#ffffff" /> */}
	</Helmet>;
}