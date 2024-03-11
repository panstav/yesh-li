import { Script } from "gatsby";

const googleAnalyticsKey = process.env.GATSBY_GOOGLE_ANALYTICS_KEY;

/* eslint-disable */
export default function GoogleAnalytics () {
	if (!googleAnalyticsKey) return null;

	return <>
		<Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsKey}`}></Script>
		<Script dangerouslySetInnerHTML={{
			__html: `window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments)}
			gtag('js', new Date());
			gtag('config', '${googleAnalyticsKey}');` }} />
	</>;
}

export function reportConversion (conversionId) {
	if (!googleAnalyticsKey) return null;

	try {
		gtag('event', 'conversion', { 'send_to': `AW-11119409341/${conversionId}` });
	} catch (err) {}
}