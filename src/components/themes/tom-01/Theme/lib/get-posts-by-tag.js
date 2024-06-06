export default function getPostsByTag(posts, { title }) {
	return posts.filter((post) => post.tags.find((tagAtPost) => tagAtPost.title === title));
}
