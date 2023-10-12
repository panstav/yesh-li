import '@styles/index.sass';

export { wrapPageElement } from '@config/Page';

export function onRenderBody({ setHtmlAttributes }) {
	setHtmlAttributes({ lang: 'he', dir: 'rtl' });
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents();

	promote(headComponents, (item) => ['preload', 'preconnect'].includes(item?.props?.rel));

	replaceHeadComponents(headComponents);
};

function promote(array, findFn) {
	// find indexes of all items that match the findFn
	const indexes = array.reduce((acc, item, index) => {
		if (findFn(item)) acc.push(index);
		return acc;
	}, []);
	// push those items to the top of the array
	indexes.forEach((index) => array.unshift(array.splice(index, 1)[0]));
}