import { lazy } from 'react';

import { themes as map } from 'yeshli-shared';

import rootThemeData from '@data/root.json';

export const defaultTheme = 'alon-01';

export const themesMap = getMappedComponents('Theme');
export const themeFieldsMap = getMappedComponents('Editor');
export const onboardingStepsMap = getMappedComponents('Onboarding');

function getMappedComponents (type) {
	return map.reduce((accu, { themeName, collectionPages }) => {

		// set main page of theme as a lazy component
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));

		// if type is not Theme or theme is not at the root, return
		if (type !== 'Theme' || rootThemeData?.theme !== themeName) return accu;

		// if theme has additional custom pages, add them to the map
		if (rootThemeData.customPages?.length) rootThemeData.customPages.forEach(({ key, path }) => {
			accu[`${themeName}/${key}`] = lazy(() => import(`./${themeName}/Theme/${path}`));
		});

		// if theme has additional collection pages, add them to the map
		if (collectionPages?.length && rootThemeData.content.collectionPages) collectionPages.forEach(({ type, prefix, componentPath }) => {
			rootThemeData.content.collectionPages[type].forEach(({ slug }) => {
				accu[`${themeName}/${prefix}/${slug}`] = lazy(() => import(`./${themeName}/Theme/${componentPath}`));
			});
		});

		return accu;
	}, {});
}