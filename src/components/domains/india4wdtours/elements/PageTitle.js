import classNames from "classnames";

export default function PageTitle({ className: classes, children }) {
	const titleClassName = classNames('title is-3 is-size-2-tablet has-text-weight-normal', classes);

	return <h1 className={titleClassName} style={{ lineHeight: '1.3' }}>
		{children}
	</h1>;
}