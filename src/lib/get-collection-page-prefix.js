import { themes } from "yeshli-shared";

export default function getCollectionPagePrefix(theme, type) {
	return themes
		.find(({ themeName }) => themeName === theme)
		.collectionPages.find((collectionPage) => collectionPage.type === type)
		.prefix;
}