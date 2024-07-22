import classNames from "classnames";

export default function InfoAside({ className: classes, style, containerRef: ref, children }) {
	const className = classNames("is-flex is-flex-direction-column is-flex-gap-2 has-background-white-ter has-strong-radius px-4", classes);
	return <div {...{ ref, className, style }}>
		{children}
	</div>;
}