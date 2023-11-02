import { useFormContext } from "react-hook-form";

import cleanUGT from "@lib/clean-user-generated-text";

import copy from '@pages/Editor/copy';

export default function TextArea({ id, label, description, maxLength, required = true }) {
	const { register, getFieldState } = useFormContext();
	const { error } = getFieldState(id);

	return <div className='field'>
		<label htmlFor={id} className='label'>{label}:</label>
		<textarea id={id} className='textarea' {...register(id, {
			required: required && copy.requiredField,
			setValueAs: (val) => cleanUGT(val),
			maxLength: maxLength && { value: maxLength, message: copy.maxLengthField(maxLength) }
		})} />
		{error?.message
			? <p className='help is-danger'>{error?.message}</p>
			: <p className='help'>{description}</p>}
	</div>;
}