import { useFormContext } from "react-hook-form";

import { useFieldLabels } from "@hooks/use-i18n";

export default function DateInput({ id, label, type = 'date', description, required = true }) {
	const t = useFieldLabels();
	const { register, getFieldState, formState } = useFormContext();
	const { error } = getFieldState(id, formState);

	const inputConfig = {
		required: required && t.required_field
	};

	return <div className='field'>
		{label && <label htmlFor={id}>{label}:</label>}
		<input id={id} className="input" type={type} {...register(id, inputConfig)} />
		{error?.message
			? <p className='help is-danger'>{error?.message}</p>
			: <p className='help'>{description}</p>}
	</div>;
}