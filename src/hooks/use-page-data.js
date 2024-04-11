import { useContext } from "react";

import { PageContext } from "@config/Page";

export default function usePageData () {
	return useContext(PageContext);
}

export function usePageContent () {
	return usePageData().content;
}