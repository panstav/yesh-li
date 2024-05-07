import { createI18nWrapper } from "@config/I18n";

import PageWrapper from "@wrappers/PageWrapper";
import GoogleAnalytics from "@elements/GoogleAnalytics";
import MicrosoftClarity from "@elements/MicrosoftClarity";

import i18n from './i18n';
import domainData from './index.json';

export const domainProps = {
	...domainData,
	children: <>
		<MicrosoftClarity />
		<GoogleAnalytics />
	</>
};

export const wrapPage = createDomainWrapper(i18n);

export function wrapTitle(title, { flip } = {}) {
	const first = flip ? domainData.title : title;
	const second = flip ? title : domainData.title;
	return { title: `${first} • ${second}` };
}

export function createDomainWrapper(i18n) {

	const I18nWrapper = createI18nWrapper(i18n);

	return (page) => {

		page.Wrapper = Wrapper;
		return page;

		function Wrapper({ children }) {
			return <I18nWrapper>
				<PageWrapper>
					{children}
				</PageWrapper>
			</I18nWrapper>;
		}
	};

}