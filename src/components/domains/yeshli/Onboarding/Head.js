import { HeadFor } from "@config/Meta";

import { domainProps, wrapTitle } from "..";

export default HeadFor({
	...domainProps,
	...wrapTitle('מתחילים'),
	isInternal: true
});