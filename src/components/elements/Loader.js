import classNames from "classnames";

export default function Loader ({ marginTop }) {

	const className = classNames("is-overlay loader is-primary", marginTop ? 'mx-auto' : 'm-auto');
	const style = { width: '2rem', height: '2rem', borderBottomColor: 'var(--color-primary)', borderLeftColor: 'var(--color-primary)', ...marginTop ? { marginTop } : {} };

	return <div className={className} style={style} />;
}