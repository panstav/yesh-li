import { lazy } from 'react';

import rootThemeData from '/data/root.json';

import map from './map.json';

export const defaultTheme = 'alon-01';

export const themesMap = getMappedComponents('Theme');
export const fieldsMap = getMappedComponents('Editor');
export const onboardingStepsMap = getMappedComponents('Onboarding');

function getMappedComponents (type) {
	return map.reduce((accu, { themeName, collectionPages }) => {

		// set main page of theme as a lazy component
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));

		// if type is not Theme or theme is not at the root, return
		if (type !== 'Theme' || rootThemeData[0]?.theme !== themeName) return accu;

		// if theme has additional custom pages, add them to the map
		if (rootThemeData[0].customPages?.length) rootThemeData[0].customPages.forEach(({ key, path }) => {
			accu[`${themeName}/${key}`] = lazy(() => import(`./${themeName}/Theme/${path}`));
		});

		// if theme has additional collection pages, add them to the map
		if (collectionPages?.length && rootThemeData[0].content.collectionPages) collectionPages.forEach(({ type, prefix, componentPath }) => {
			rootThemeData[0].content.collectionPages[type].forEach(({ slug }) => {
				accu[`${themeName}/${prefix}/${slug}`] = lazy(() => import(`./${themeName}/Theme/${componentPath}`));
			});
		});

		return accu;
	}, {});
}