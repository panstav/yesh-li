import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";

import cleanUGT from "@lib/clean-user-generated-text";

export default function TextInput({ id, label, labelClassName: labelClasses, type = 'text', description, validate, pattern, maxLength, required = true, setValueAs = x => x, onChange, isSmall, autoComplete }) {
	const t = useFieldLabels();
	const { register, getFieldState, formState } = useFormContext();
	const { error } = getFieldState(id, formState);

	const valueAs = (val) => {
		if (type === 'number') return setValueAs(val);
		return setValueAs(cleanUGT(val));
	};

	const labelClassName = classNames('label', labelClasses);
	const inputClassName = classNames('input', isSmall && 'is-small');

	const inputConfig = {
		required: required && t.required_field,
		maxLength: maxLength && { value: maxLength, message: t.maxLengthField(maxLength) },
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

function ifValid({ validate, pattern }, value) {

	// if there's no value or no validators - don't validate
	if (!value || (!validate && !pattern)) return value;

	// if there's no valid value, return false
	return (!validate || Object.values(validate).every(validator => validator(value)))
		&& (!pattern || (pattern instanceof RegExp ? pattern.test(value) : pattern.value.test(value)))
		&& value;
}