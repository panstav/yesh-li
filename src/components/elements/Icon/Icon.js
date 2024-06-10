import classNames from "classnames";

export default function Icon({ className, size = 24, sizeX = size, sizeY = size, viewBox, svgProps = { style: {} }, children, ...props }) {

	// prep cursor:pointer className
	const clickableClass = 'onClick' in props ? 'is-clickable' : '';

	props.className = classNames('icon', className, clickableClass);

	if (['onFocus', 'onBlur'].some((attribute) => attribute in props)) props.tabIndex = '0';

	return <div {...props}>
		<svg {...svgProps} style={{ width: '100%', ...svgProps.style }} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox || `0 0 ${sizeX} ${sizeY}`}>
			{children}
		</svg>
	</div>;
}