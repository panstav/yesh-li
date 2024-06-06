import { useLocation } from '@reach/router';

import useShortDomainUrl from '@hooks/use-short-domain-url';

import pallatte from '@lib/pallatte';

import Component from './Meta';

export { default as HeadFor } from './HeadFor';

export default function Meta({ siteTitle, title: pageTitle, slug, description, featuredImage, mainColorName, mainColorHex, hasAdvancedSeo = true, ...metaProps }) {

	const { pathname } = useLocation();
	const shortDomainUrl = useShortDomainUrl();
	const fullPath = `https://${shortDomainUrl}${pathname === '/' ? '' : pathname}`;
	const siteHomePath = `${shortDomainUrl}${slug ? `/${slug}` : ''}`;

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
		shortDomainUrl,
		...metaProps
	};

	return Component(props);
}

export function CssVariables ({ mainColorName, mainColorHex }) {
	return <style>{`:root { accent-color: var(--color-primary); ${pallatte.getVariables(mainColorName)} ${!mainColorName ? `--color-primary: #${mainColorHex};` : ''} }`}</style>;
}