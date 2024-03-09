import { useContext } from "react";

import { PageContext } from "@config/Page";

export default function usePageContent() {
	const { content } = useContext(PageContext);
	return content;
}