import { CssVariables } from ".";

const isRemote = !process.env.GATSBY_IS_LOCAL;

export default function Meta({ siteId, siteTitle, parentDomain, fullPath, siteHomePath, pageTitle, description, mainColorName, mainColorHex, featuredImage, hasAdvancedSeo, isInternal }) {

	return <>
		<title>{pageTitle}</title>
		<meta name="title" content={pageTitle} />
		<meta name="description" content={description} />

		<meta name="yl:domain" content={parentDomain} />

		{!isInternal && <>
			<meta property="og:type" content="website" />
			<meta property="og:url" content={fullPath} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={description} />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={fullPath} />
			<meta property="twitter:title" content={pageTitle} />
			<meta property="twitter:description" content={description} />

			{featuredImage && <>
				<meta property="og:image" content={featuredImage} />
				<meta property="twitter:image" content={featuredImage} />
			</>}

			{hasAdvancedSeo && <>

				{isRemote && <link rel="manifest" href={`${siteHomePath}/manifest.json`} />}

				<meta name="apple-mobile-web-app-title" content={siteTitle} />
				<meta name="application-name" content={siteTitle} />

				{mainColorHex && <>
					<meta name="msapplication-TileColor" content={`#${mainColorHex}`} />
					<meta name="theme-color" content={`#${mainColorHex}`} />
				</>}

				{siteId && <>
					<link rel="apple-touch-icon" sizes="180x180" href={`https://storage.googleapis.com/cloudicon/${siteId}/apple-touch-icon.png`} />
					<link rel="icon" type="image/png" sizes="32x32" href={`https://storage.googleapis.com/cloudicon/${siteId}/favicon-32x32.png`} />
					<link rel="icon" type="image/png" sizes="16x16" href={`https://storage.googleapis.com/cloudicon/${siteId}/favicon-16x16.png`} />
					<link rel="shortcut icon" href={`https://storage.googleapis.com/cloudicon/${siteId}/favicon.ico`} />
				</>}
			</>}
		</>}

		<CssVariables {...{ mainColorName, mainColorHex }} />
	</>;
}