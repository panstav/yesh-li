import { container } from './index.module.sass';

export default function Media ({ position, ...props }) {
	return <div className={container} style={{ width: '100%' }}>
		<img className="object-fit-cover" {...props} style={{ objectPosition: position }} />
	</div>;
}