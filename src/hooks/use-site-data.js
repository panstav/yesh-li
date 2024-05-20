import { useContext } from "react";

import { PageContext } from "@config/Page";

import getCollectionPage from "@lib/get-collection-page";

export default function useSiteData () {
	return useContext(PageContext);
}

export function useSiteContent () {
	return useSiteData().content;
}

export function usePageContent (page) {
	return useSiteContent().pages[page];
}

export function useCollectionPageContent() {
	const { location: { pathname }, content: { collectionPages } } = useSiteData();
	return getCollectionPage(collectionPages, pathname);
}