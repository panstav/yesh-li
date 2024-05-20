import { CssVariables } from ".";

const isRemote = !process.env.GATSBY_IS_LOCAL;

export default function Meta({ shortDomain, fullPath, title, description, mainColorName, mainColorHex, pageFeaturedImage, hasAdvancedSeo, isInternal }) {
	return <>
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="description" content={description} />

		<meta name="yl:domain" content={shortDomain} />

		{!isInternal && <>
			<meta property="og:type" content="website" />
			<meta property="og:url" content={fullPath} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={fullPath} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />

			{pageFeaturedImage && <>
				<meta property="og:image" content={pageFeaturedImage} />
				<meta property="twitter:image" content={pageFeaturedImage} />
			</>}

			{(isRemote && hasAdvancedSeo) && <>
				<link rel="manifest" href={`${padEnd(fullPath, '/')}manifest.json`} />

				<meta name="apple-mobile-web-app-title" content={title} />
				<meta name="application-name" content={title} />
				<link rel="apple-touch-icon" sizes="180x180" href={`https://storage.googleapis.com/cloudicon/${shortDomain}apple-touch-icon.png`} />
				<link rel="icon" type="image/png" sizes="32x32" href={`https://storage.googleapis.com/cloudicon/${shortDomain}favicon-32x32.png`} />
				<link rel="icon" type="image/png" sizes="16x16" href={`https://storage.googleapis.com/cloudicon/${shortDomain}favicon-16x16.png`} />
				<link rel="shortcut icon" href={`https://storage.googleapis.com/cloudicon/${shortDomain}favicon.ico`} />
				<meta name="msapplication-TileColor" content={`#${mainColorHex}`} />
				<meta name="theme-color" content={`#${mainColorHex}`} />
			</>}
		</>}

		<CssVariables {...{ mainColorName, mainColorHex }} />
	</>;
}

function padEnd(str, char) {
	return str.endsWith(char) ? str : `${str}${char}`;
}