export function trackConversion(coversionId) {
	if (typeof window === 'undefined' || typeof gtag === 'undefined') return;
	// eslint-disable-next-line no-undef
	gtag('event', 'conversion', { 'send_to': `AW-11119409341/${coversionId}` });
}