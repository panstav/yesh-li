import { createElement } from 'react';

import Page from "@config/Page";

export default function wrapPageElement({ element, props }) {
	props.config = props?.pageResources?.component?.default?.config || {};
	return createElement(
		Page,
		props,
		element
	);
}