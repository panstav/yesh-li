export default function hideHash() {
	// when a user clicking a tag, the anchor is added to the URL, which is not what we want, so we remove it
	setTimeout(() => window.history.replaceState({}, "", location.href.replace(location.hash, "")), 0);
}