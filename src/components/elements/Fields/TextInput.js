import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import cleanUGT from "@lib/clean-user-generated-text";
import isUrl from "@lib/is-url";

import copy from '@pages/Editor/copy';

export default function TextInput({ id, label, labelClassName: labelClasses, type = 'text', description, validate, pattern, maxLength, required = true, setValueAs = x => x, onChange, isSmall, autoComplete }) {
	const { register, getFieldState, formState } = useFormContext();
	const { error } = getFieldState(id, formState);

	const valueAs = (val) => setValueAs(cleanUGT(val));
	const labelClassName = classNames('label', labelClasses);
	const inputClassName = classNames('input', isSmall && 'is-small');

	const inputConfig = {
		required: required && copy.requiredField,
		maxLength: maxLength && { value: maxLength, message: copy.maxLengthField(maxLength) },
		setValueAs: valueAs
	};

	if (pattern) inputConfig.pattern = pattern;
	if (validate) inputConfig.validate = validate;
	if (onChange) inputConfig.onChange = (event) => onChange(ifValid({ validate, pattern }, valueAs(event.target.value)));
	if (autoComplete) inputConfig.autoComplete = autoComplete;

	return <div className='field'>
		{label && <label htmlFor={id} className={labelClassName}>{label}:</label>}
		<input id={id} className={inputClassName} type={type} {...register(id, inputConfig)} />
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
			incldues: (s) => (!s || s.includes(includes)) || `הכתובת צריכה להכיל "${includes}"`,
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

function ifValid({ validate, pattern }, value) {

	// if there's no value or no validators - don't validate
	if (!value || (!validate && !pattern)) return value;

	// if there's no valid value, return false
	return (!validate || Object.values(validate).every(validator => validator(value)))
		&& (!pattern || (pattern instanceof RegExp ? pattern.test(value) : pattern.value.test(value)))
		&& value;
}