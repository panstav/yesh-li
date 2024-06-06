import { themes as map } from 'yeshli-shared';

export default function getCollectionPage(collectionPages, pathname) {
	let res;

	Object.keys(collectionPages).find((type) => {
		return collectionPages[type].find((collectionPage) => {

			const slug = collectionPage.slug;
			if (!pathname.includes(slug)) return;

			return map.find((themeData) => {
				const page = themeData.collectionPages?.find(({ prefix }) => `/${prefix}/${slug}` === pathname);
				if (page) res = collectionPage;
				return page;
			});
		});
	});

	return res;
}