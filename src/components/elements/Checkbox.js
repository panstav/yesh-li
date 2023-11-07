import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

export default function Checkbox({ id, label, besideLabel, className: classes }) {
	const { register } = useFormContext();
	const className = classNames('field is-flex is-align-items-center', classes);
	return <div className={className}>
		<label className='is-flex'>
			<input className='me-1' type="checkbox" {...register(id)} />
			{label}
		</label>
		{besideLabel}
	</div>;
}