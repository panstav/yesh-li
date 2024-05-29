import { useLocation } from '@reach/router';

import pallatte from '@lib/pallatte';

import Component from './Meta';
import { graphql, useStaticQuery } from 'gatsby';

export { default as HeadFor } from './HeadFor';

export default function Meta({ siteTitle, title: pageTitle, slug, description, featuredImage, mainColorName, mainColorHex, hasAdvancedSeo = true, ...metaProps }) {

	const { pathname } = useLocation();
	const domainUrl = useGatsbyDomainUrl();
	const fullPath = `${domainUrl}${pathname === '/' ? '' : pathname}`;
	const siteHomePath = `${domainUrl}${slug ? `/${slug}` : ''}`;

	const normalizedDescription = Array.isArray(description) ? description.join(' ') : description;

	mainColorHex = mainColorHex || pallatte.getColor(mainColorName);

	const props = {
		siteTitle,
		pageTitle,
		fullPath,
		description: normalizedDescription,
		mainColorName,
		mainColorHex,
		featuredImage,
		hasAdvancedSeo,
		siteHomePath,
		...metaProps
	};

	return Component(props);
}

export function CssVariables ({ mainColorName, mainColorHex }) {
	return <style>{`:root { accent-color: var(--color-primary); ${pallatte.getVariables(mainColorName)} ${!mainColorName ? `--color-primary: #${mainColorHex};` : ''} }`}</style>;
}

function useGatsbyDomainUrl() {
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