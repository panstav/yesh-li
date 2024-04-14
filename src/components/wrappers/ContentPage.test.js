
import { canRenderChildren } from "@test/checks";

import ContentPage from "./ContentPage";

it("should render children", () => {
	canRenderChildren(ContentPage);
});