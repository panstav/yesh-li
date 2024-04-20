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
	const domainName = 'יש.לי';
	const first = flip ? domainName : title;
	const second = flip ? title : domainName;
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