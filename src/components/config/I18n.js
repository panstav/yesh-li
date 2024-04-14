import { createContext } from 'react';

export const I18nContext = createContext();

export function wrapI18n(Component, i18n) {
	if (!i18n) throw new Error("No i18n data was given.");

	return function I18nWrapper () {
		return <I18nContext.Provider value={i18n}>
			<Component />
		</I18nContext.Provider>;
	};
}