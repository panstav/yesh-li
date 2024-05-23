import { useLocation } from '@reach/router';

import pallatte from '@lib/pallatte';

import Component from './Meta';
import { graphql, useStaticQuery } from 'gatsby';

export { default as HeadFor } from './HeadFor';

export default function Meta({ title, description, featuredImage: pageFeaturedImage, mainColorName, mainColorHex, isInternal, hasAdvancedSeo = true }) {

	const { pathname } = useLocation();
	const parentDomain = useYeshLiDomain();
	const fullPath = `${parentDomain}${pathname === '/' ? '' : pathname}`;

	const normalizedDescription = Array.isArray(description) ? description.join(' ') : description;

	mainColorHex = mainColorHex || pallatte.getColor(mainColorName);

	const props = {
		parentDomain,
		fullPath,
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

function useYeshLiDomain() {
	const { site: { siteMetadata: { siteUrl } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);
	return siteUrl;
}