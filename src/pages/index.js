import GoogleAnalytics from "@elements/GoogleAnalytics";
import MicrosoftClarity from "@elements/MicrosoftClarity";

import "@fontsource/assistant";

export { default } from "@pages/Index";

export const Head = () => <>
	<GoogleAnalytics />
	<MicrosoftClarity />
</>;