import RenderChildren from "@wrappers/RenderChildren";

import { wrapI18n } from "./I18n";

it("should throw if no i18n file was given", () => {

	const mockRenderWithI18n = jest.fn(() => wrapI18n(() => <RenderChildren />));

	let error;
	try {
		mockRenderWithI18n();
	} catch (err) {
		error = err;
	}
	expect(error).toBeInstanceOf(Error);

	expect(wrapI18n(() => <RenderChildren />, {})).not.toThrow();
	expect(mockRenderWithI18n.mock.calls).toHaveLength(1);

});