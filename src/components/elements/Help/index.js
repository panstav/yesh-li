import classNames from "classnames";

import { help, isSmall, isMedium, isLarge } from './index.module.sass';

export default function Help({ className: classes, size }) {
	const className = classNames(help, { small: isSmall, medium: isMedium, large: isLarge }[size], classes);
	return <div className={className}>?</div>;
}