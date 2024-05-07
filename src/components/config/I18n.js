import { createContext } from 'react';

export const I18nContext = createContext();

export function createI18nWrapper(i18n) {
	if (!i18n) throw new Error("No i18n data was given.");

	return function I18nWrapper ({ children }) {
		return <I18nContext.Provider value={i18n}>
			{children}
		</I18nContext.Provider>;
	};
}