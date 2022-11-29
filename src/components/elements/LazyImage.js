import classNames from "classnames";

export default function LazyImage({ className: classes, src, alt, ...props }) {
	props.className = classNames('lazyload', classes);
	props['data-src'] = src;
	return <img {...props} alt={alt} />;
}