import { useContext } from "react";

import { PageContext } from "@config/Page";

export default function useSiteData () {
	return useContext(PageContext);
}

export function useSiteContent () {
	return useSiteData().content;
}