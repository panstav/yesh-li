import { useFormContext } from 'react-hook-form';

export default function Checkbox({ id, label, besideLabel }) {
	const { register } = useFormContext();
	return <div className='field is-flex is-align-items-center'>
		<label className='is-flex'>
			<input className='ml-1' type="checkbox" {...register(id)} />
			{label}
		</label>
		{besideLabel}
	</div>;
}