import { lazy } from 'react';

import rootThemeData from '/data/root.json';

import map from './map.json';

export const defaultTheme = 'alon-01';

export const themesMap = getMappedComponents('Theme');
export const fieldsMap = getMappedComponents('Editor');
export const onboardingStepsMap = getMappedComponents('Onboarding');

function getMappedComponents (type) {
	return map.reduce((accu, { themeName }) => {

		// set main page of theme as a lazy component
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));

		// if theme as additional pages, add them to the map
		if (type === 'Theme' && rootThemeData[0]?.theme === themeName && rootThemeData[0]?.customPages?.length) rootThemeData[0].customPages.forEach(({ key, path }) => {
			accu[`${themeName}/${key}`] = lazy(() => import(`./${themeName}/Theme/${path}`));
		});

		return accu;
	}, {});
}