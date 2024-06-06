export default function getDirByLang(lang, { bothSides } = {}) {
	const forward = lang === 'he' ? 'rtl' : 'ltr';
	if (!bothSides) return forward;
	return { forward, backward: forward === 'rtl' ? 'ltr' : 'rtl' };
}