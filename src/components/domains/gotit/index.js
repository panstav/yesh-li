export const featuredImage = "https://storage.googleapis.com/yeshli-www/assets/yeshli-home-featured-02.png";

import { wrapI18n } from "@config/I18n";

import domainData from "./index.json";
import i18n from "./i18n";
import PageWrapper from "@wrappers/PageWrapper";

export const domainProps = domainData;

export function wrapTitle(title) {
	return { title: `${title} • Got.it` };
}

export function wrapPage(Page) {
	return wrapI18n(DomainWrapper, i18n);
	function DomainWrapper() {
		return <PageWrapper>
			<Page />
		</PageWrapper>;
	}
}