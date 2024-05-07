import { createI18nWrapper } from "./I18n";

it("should throw if no i18n file was given", () => {

	const mockRenderWithI18n = jest.fn(() => createI18nWrapper());

	let error;
	try {
		mockRenderWithI18n();
	} catch (err) {
		error = err;
	}
	expect(error).toBeInstanceOf(Error);

	expect(mockRenderWithI18n.mock.calls).toHaveLength(1);
});

it("should not throw if an i18n file was given", () => {
	expect(() => createI18nWrapper({})).not.toThrow();
});