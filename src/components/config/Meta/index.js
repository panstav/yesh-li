import { graphql, useStaticQuery } from 'gatsby';

import pallatte from '@lib/pallatte';

import Component from './Meta';

export { default as HeadFor } from './HeadFor';

export default function Meta({ title, description, pathname, featuredImage: pageFeaturedImage, mainColorName, mainColorHex, isInternal, hasAdvancedSeo = true }) {

	const { site: { siteMetadata: { siteUrl } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);

	const normalizedDescription = Array.isArray(description) ? description.join(' ') : description;

	const pagePathname = siteUrl + pathname;
	const shortDomain = ((shortUrl) => {
		return `${shortUrl}${shortUrl.endsWith('/') ? '' : '/'}`;
	})(pagePathname.slice(pagePathname.indexOf('://') + 3));

	mainColorHex = mainColorHex || pallatte.getColor(mainColorName);

	const props = {
		shortDomain,
		siteUrl,
		pagePathname,
		title,
		description: normalizedDescription,
		mainColorName,
		mainColorHex,
		pageFeaturedImage,
		hasAdvancedSeo,
		isInternal
	};

	return Component(props);
}

export function CssVariables ({ mainColorName, mainColorHex }) {
	return <style>{`:root { accent-color: var(--color-primary); ${pallatte.getVariables(mainColorName)} ${!mainColorName ? `--color-primary: #${mainColorHex};` : ''} }`}</style>;
}