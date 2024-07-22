import { usePageContent } from "@hooks/use-site-data";

import Hero from "@domains/india4wdtours/elements/Hero";

import Featured from "./Featured";

import { wrapPage } from "@domains/india4wdtours";

export { default as Head } from "./Head";

export default wrapPage(Homepage);

function Homepage() {
	const { title, subtitle, featuredImage, isBackgroundDark, cta } = usePageContent('home');

	return <>
		<Hero textInCenter {...{ title, subtitle, featuredImage, isBackgroundDark, cta }} />
		<Map />
		<Featured />
		<Reviews />
		<Cta />
	</>;
}

function Map() {
	return 'map';
}

function Reviews() {
	return 'Reviews';
}

function Cta() {
	return 'Cta';
}
