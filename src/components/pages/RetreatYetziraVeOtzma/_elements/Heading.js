import classNames from "classnames";

export default function Heading({ className: classes, children }) {
	const className = classNames('is-size-5 mb-3 has-text-weight-bold', classes);
	return <h2 {...{ className }}>
		{children}
	</h2>;
}