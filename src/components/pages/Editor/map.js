import { lazy } from 'react';

const mapped = [
	'Elyse-01',
	'Alon-01'
];

export const fieldsMap = mapped.reduce((accu, themeName) => {
	accu[themeName.toLowerCase()] = lazy(() => import(`./ThemeFieldGroups/${themeName}`));
	return accu;
}, {});

export const themesMap = mapped.reduce((accu, themeName) => {
	accu[themeName.toLowerCase()] = lazy(() => import(`@themes/${themeName}`));
	return accu;
}, {});