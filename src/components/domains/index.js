import { lazy } from 'react';

import { domains as map } from 'yeshli-shared';

import domainData from '@data/domain.json';

export const domainsMap = getMappedComponents('pages');
export const domainFieldsMap = getMappedComponents('Admin');

function getMappedComponents (type) {
	return map.reduce((accu, { domain, collectionPages }) => {

		const domainName = domain.replace('.', '');

		// set main page of theme as a lazy component
		accu[domain] = lazy(() => import(`./${domainName}/${type}`));

		if (type !== 'pages') return accu;

		// if theme has additional collection pages, add them to the map
		if (collectionPages?.length && domainData.content.collectionPages) collectionPages.forEach(({ type, prefix, componentPath }) => {
			domainData.content.collectionPages[type].forEach(({ slug }) => {
				accu[`${domain}/${prefix}/${slug}`] = lazy(() => import(`./${domainName}/${componentPath}`));
			});
		});

		return accu;
	}, {});
}