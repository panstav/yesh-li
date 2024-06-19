import classnames from 'classnames';

export default function Section({ className = '', withTopMargin = true, withSidePadding = true, children, ...props }) {
	props.className = classnames('container', withSidePadding && 'px-3', withTopMargin && 'mt-6', className);
	return <div {...props}>{children}</div>;
}