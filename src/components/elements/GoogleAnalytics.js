/* eslint-disable */
export default function GoogleAnalytics () {
	return <>
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-6S1RKXRGW7"></script>
		<script dangerouslySetInnerHTML={{
			__html: `window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments)}
			gtag('js', new Date());

			gtag('config', 'G-6S1RKXRGW7');` }} />
	</>;
}