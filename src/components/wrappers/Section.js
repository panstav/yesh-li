import classnames from 'classnames';

export default function Section({ className: classes = '', style, noTopMargin, noSidePadding, isFullWidth, anchor: id, children }) {

	const className = classnames(
		'container',
		isFullWidth ? 'is-fullhd' : 'is-max-desktop',
		classes,
		noSidePadding || 'px-3',
		noTopMargin || 'mt-6'
	);

	return <section {...{ id, className, style }}>{children}</section>;
}