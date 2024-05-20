import classNames from "classnames";

export default function Delimiter({ className: classes, style: _style, isVertical }) {
	const className = classNames('mx-auto', classes);
	const style = { [isVertical ? 'borderLeft' : 'borderTop']: '3px solid black', ..._style };
	return <div className={className} style={style} />;
}