import { useContext } from "react";

import { PageContext } from "@config/Page";

export default function useSiteData () {
	return useContext(PageContext);
}

export function useSiteContent () {
	return useSiteData().content;
}

export function usePageContent (page) {
	return useSiteContent().pages[page];
}