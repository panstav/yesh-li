import classNames from 'classnames';

import { container } from './media.module.sass';

export default function Media({ position, ...props }) {

	const containerClassName = classNames(container, "is-relative");

	return <div className={containerClassName} style={{ width: '100%', maxWidth: '1400px' }}>
		<img className="object-fit-cover" {...props} style={{ objectPosition: position }} />
	</div>;
}