import { createDomainWrapper } from "@domains/yeshli";

import i18n from './i18n';
import domainData from './index.json';

export const domainProps = {
	...domainData
};

export const wrapPage = createDomainWrapper(i18n);

export function wrapTitle(title, { flip } = {}) {
	const domainName = 'YeshLi';
	const first = flip ? domainName : title;
	const second = flip ? title : domainName;
	return { title: `${first} • ${second}` };
}