import { wrapI18n } from "@config/I18n";

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

export function wrapTitle(title, { flip } = {}) {
	const first = flip ? domainData.title : title;
	const second = flip ? title : domainData.title;
	return { title: `${first} • ${second}` };
}

export function wrapPage(Page) {
	return wrapI18n(DomainWrapper, i18n);
	function DomainWrapper() {
		return <PageWrapper>
			<Page />
		</PageWrapper>;
	}
}