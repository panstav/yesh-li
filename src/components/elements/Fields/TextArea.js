import { useFormContext } from "react-hook-form";

import cleanUGT from "@lib/clean-user-generated-text";

import { useFieldLabels } from "@hooks/use-i18n";

export default function TextArea({ id, label, description, maxLength, required = true }) {

	const t = useFieldLabels();
	
	const { register, getFieldState } = useFormContext();
	const { error } = getFieldState(id);

	return <div className='field'>
		<label htmlFor={id} className='label'>{label}:</label>
		<textarea id={id} className='textarea' {...register(id, {
			required: required && t.required_field,
			setValueAs: (val) => cleanUGT(val),
			maxLength: maxLength && { value: maxLength, message: t.maxLengthField(maxLength) }
		})} />
		{error?.message
			? <p className='help is-danger'>{error?.message}</p>
			: <p className='help'>{description}</p>}
	</div>;
}