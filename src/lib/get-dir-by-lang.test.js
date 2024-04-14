import getDirByLang from "./get-dir-by-lang";

it('should return "ltr" for "en"', () => {
	expect(getDirByLang('en')).toBe('ltr');
});

it('should return "rtl" for "he"', () => {
	expect(getDirByLang('he')).toBe('rtl');
});