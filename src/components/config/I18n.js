import { createContext } from 'react';

export const I18nContext = createContext();

export function wrapI18n(Component, i18n) {
	return function I18nWrapper () {
		return <I18nContext.Provider value={i18n}>
			<Component />
		</I18nContext.Provider>;

	};
}