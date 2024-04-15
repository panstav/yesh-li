
import { canRenderChildren } from "@test/checks";

import ContentPage from "./ContentPage";

it("should render children", () => {

	let error;
	try {
		canRenderChildren(ContentPage);

	} catch (err) {
		error = err;
		throw err;
	}
	expect(error).toBeUndefined();

});