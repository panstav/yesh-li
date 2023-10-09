import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import cleanUGT from "@lib/clean-user-generated-text";
import isUrl from "@lib/is-url";

import copy from '@pages/Editor/copy';

export default function TextInput({ id, label, type = 'text', description, validate, pattern, maxLength, required = true, setValueAs = x => x, isSmall }) {
	const { register, getFieldState } = useFormContext();
	const { error } = getFieldState(id);
	const inputClassName = classNames('input', isSmall && 'is-small');
	return <div className='field'>
		<label htmlFor={id} className='label'>{label}:</label>
		<input id={id} className={inputClassName} type={type} {...register(id, {
			required: required && copy.requiredField,
			pattern,
			maxLength: maxLength && { value: maxLength, message: copy.maxLengthField(maxLength) },
			validate,
			setValueAs: (val) => setValueAs(cleanUGT(val))
		})} />
		{error?.message
			? <p className='help is-danger'>{error?.message}</p>
			: <p className='help'>{description}</p>}
	</div>;
}

export function UrlInput({ type = 'url', validate, includes, required, ...props }) {
	return <TextInput
		type={type}
		validate={{
			...validate,
			// only invalidate these if value is present, otherwise it's the required validator's responsibility
			incldues: (s) => (!s || s.includes(includes)) || `הכתובת צריכה להתחיל ב-"${includes}"`,
			isUrl: (s) => (!s || isUrl(s)) || copy.invalidUrl
		}}
		required={required}
		{...props} />;
}

export function TelInput(props) {
	return <TextInput
		type='tel'
		pattern={{ value: /^\+972\d{8,9}$/, message: copy.invalidPhoneNumber }}
		setValueAs={(str) => str.trim().replace(/-/g, '').replace(/^0/, '+972')}
		{...props} />;
}

export function EmailInput(props) {
	return <TextInput
		type="email"
		pattern={{ value: /\S+@\S+\.\S+/, message: copy.invalidEmail }}
		{...props} />;
}