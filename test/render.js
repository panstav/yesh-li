import renderer from 'react-test-renderer';

import { wrapI18n } from '@config/I18n';
import i18n from '@domains/yeshli/i18n';

export default function render (Component) {
	return getTestInstance(
		renderer.create(wrapI18n(Component, i18n)())
	);
}

export function renderWithoutI18n (Component) {
	return getTestInstance(
		renderer.create(Component())
	);
}

function getTestInstance (renderer) {
	return renderer.root;
}