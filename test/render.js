import renderer from 'react-test-renderer';

import { createI18nWrapper } from '@config/I18n';
import i18n from '@domains/yeshli/i18n';

export default function render (Component) {

	return getTestInstance(
		renderer.create(WrapperComponent())
	);

	function WrapperComponent () {
		const Wrapper = createI18nWrapper(i18n);
		return Wrapper({ children: Component() });
	}

}

export function renderWithoutI18n (Component) {
	return getTestInstance(
		renderer.create(Component())
	);
}

function getTestInstance (renderer) {
	return renderer.root;
}