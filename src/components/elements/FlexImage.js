import classNames from "classnames";
import RenderChildren from "@wrappers/RenderChildren";

export default function FlexImage({ position = '50% 50%', className: classes, wrapper, wrapperProps = {}, ...props }) {

	const className = classNames('object-fit-cover', classes);
	props.style = Object.assign({ objectPosition: position }, props.style || {});

	const Wrapper = wrapper || RenderChildren;
	const wrapperClasses = classNames('object-fit-cover', wrapperProps.className);

	return <Wrapper {...wrapperProps} className={wrapperClasses}>
		<img className={className} {...props} />
	</Wrapper>;
}