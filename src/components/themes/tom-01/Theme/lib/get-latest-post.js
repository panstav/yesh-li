export default function getLatestPost(posts) {
	return sortByDate(posts)[0];
}

export function sortByDate(posts) {
	return posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}