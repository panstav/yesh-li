import { domains, themes } from "yeshli-shared";

// prep a combined map of all entries with collectionPages to avoid reiterating over irrelevant data
const combinedMap = [...themes, ...domains]
	.filter(({ collectionPages }) => collectionPages);

export default function getCollectionPage(collectionPages, pathname) {

	let res;
	combinedMap.find((mapItem) => {

		// go though each collectionPage and find the one that matches the pathname exactly
		const { type, prefix } = mapItem.collectionPages.find(({ prefix }) => pathname.startsWith(`/${prefix}/`)) || {};
		if (!type) return;

		return collectionPages[type].find((collectionPage) => {
			if (pathname === `/${prefix}/${collectionPage.slug}`) {
				res = collectionPage;
				return true;
			}
		});
	});

	return res;
}

// previous implementation, i think it was much more expensive
// Object.keys(collectionPages).find((type) => {
// 	return collectionPages[type].find((collectionPage) => {

// 		const slug = collectionPage.slug;
// 		if (!pathname.includes(slug)) return;

// 		return combinedMap.find((themeData) => {
// 			const page = themeData.collectionPages?.find(({ prefix }) => `/${prefix}/${slug}` === pathname);
// 			if (page) res = collectionPage;
// 			return page;
// 		});
// 	});
// });