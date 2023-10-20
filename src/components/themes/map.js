import { lazy } from 'react';

const mapped = [
	'elyse-01',
	'alon-01'
];

export const themesMap = getMappedComponents('Theme');
export const fieldsMap = getMappedComponents('Editor');

function getMappedComponents (type) {
	return mapped.reduce((accu, themeName) => {
		accu[themeName] = lazy(() => import(`./${themeName}/${type}`));
		return accu;
	}, {});
}