import classNames from 'classnames';

import { help, isSmall, isMedium, isLarge } from './index.module.sass';

export default function Help ({ size }) {
	const className = classNames(help, { small: isSmall, medium: isMedium, large: isLarge}[size]);
	return <div className={className}>?</div>;
}