import { lazy } from 'react';

const mapped = [
	'alon-01',
	'elyse-01'
];

export const defaultTheme = 'alon-01';

export const themesMap = getMappedComponents('Theme');
export const fieldsMap = getMappedComponents('Editor');
export const onboardingStepsMap = getMappedComponents('Onboarding');

function getMappedComponents (type) {

	const map = mapped.reduce((accu, themeName) => {
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));
		return accu;
	}, {});

	return map;
}