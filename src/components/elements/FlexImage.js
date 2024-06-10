import classNames from "classnames";

export default function FlexImage({ position = '50% 50%', className: classes, ...props }) {
	const className = classNames('object-fit-cover', classes);
	props.style = Object.assign({ objectPosition: position }, props.style || {});
	return <img className={className} {...props} />;
}