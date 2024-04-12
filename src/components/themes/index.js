import { lazy } from 'react';

import map from './map.json';

export const defaultTheme = 'alon-01';

export const themesMap = getMappedComponents('Theme');
export const fieldsMap = getMappedComponents('Editor');
export const onboardingStepsMap = getMappedComponents('Onboarding');

function getMappedComponents (type) {
	return map.reduce((accu, { themeName }) => {
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));
		return accu;
	}, {});
}