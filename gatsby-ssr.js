import '@styles/index.sass';

import { themes as themesMap } from 'yeshli-shared';

const shortDomain = new URL(process.env.URL).hostname;

let generator;

export { wrapPageElement } from '@config/Page';

export async function onPreRenderHTML({ getHeadComponents, replaceHeadComponents }) {
	const headComponents = getHeadComponents();

	// promote the preconnect and preload tags to the top of the head, so they are loaded before the css dump and everything else
	promote(headComponents, (item) => ['preload', 'preconnect'].includes(item?.props?.rel));

	// replace the default generator meta tag with our own
	if (!generator) getGenerator();
	set(headComponents, (item) => item?.props?.name === 'generator', (item) => {
		item.props.content = generator;
		return item;
	});

	replaceHeadComponents(headComponents);
}

function getGenerator() {

	let domain;
	try {
		const siteData = require(`./data/root.json`);
		domain = themesMap.find(({ themeName }) => themeName === siteData.theme).parentDomain;
	} catch (error) {
		domain = shortDomain;
	}

	// yesh.li => YeshLi
	const name = domain.split('.').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
	const url = `https://${domain}`;
	const version = process.env.npm_package_version;

	generator = `${name} ${version} (${url})`;
}

function promote(array, findFn) {
	// find indexes of all items that match the findFn
	const indexes = array.reduce((acc, item, index) => {
		if (findFn(item)) acc.push(index);
		return acc;
	}, []);
	// push those items to the top of the array
	indexes.forEach((index) => array.unshift(array.splice(index, 1)[0]));
}

function set(array, findFn, setFn) {
	array.forEach((item, index) => {
		if (findFn(item, index)) setFn(item, index);
	});
}