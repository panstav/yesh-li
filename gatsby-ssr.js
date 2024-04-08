import '@styles/index.sass';

export { wrapPageElement } from '@config/Page';

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents();

	// promote the preconnect and preload tags to the top of the head, so they are loaded before the css dump and everything else
	promote(headComponents, (item) => ['preload', 'preconnect'].includes(item?.props?.rel));

	// replace the default generator meta tag with our own
	set(headComponents, (item) => item?.props?.name === 'generator', (item) => {
		item.props.content = `YeshLi ${process.env.npm_package_version} (https://yesh.li)`;
		return item;
	});

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

function set(array, findFn, setFn) {
	array.forEach((item, index) => {
		if (findFn(item, index)) setFn(item, index);
	});
}