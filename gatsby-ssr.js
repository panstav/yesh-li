import "@fontsource/assistant";
import lazySizes from 'lazysizes';

import '@styles/index.sass';

export { wrapPageElement } from '@config/Page';

lazySizes.cfg.expand = 300;

export function onRenderBody({ setHtmlAttributes }) {
	setHtmlAttributes({ lang: 'he', dir: 'rtl' });
}