export default function getLatestPost(posts) {
	return posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))[0];
}