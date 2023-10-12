export default function LazyImage(props) {
	return <img {...props} loading="lazy" />;
}