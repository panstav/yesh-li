import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";
import useUniqueValidation from "@hooks/use-unique-validation";

import cleanUGT from "@lib/clean-user-generated-text";

export default function TextInput({ id, label, labelClassName: labelClasses, type = 'text', description, validate, pattern, unique, maxLength, required = true, setValueAs = x => x, onChange, debounceOnChange, isSmall, autoComplete, disabled }) {
	const t = useFieldLabels();
	const { register, getFieldState, formState } = useFormContext();
	const { error } = getFieldState(id, formState);

	const uniqueValidation = useUniqueValidation(unique?.id, unique?.key, unique?.name);

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
	if (unique) inputConfig.validate ? Object.assign(inputConfig.validate, uniqueValidation) : inputConfig.validate = uniqueValidation;

	const onChangeHandler = (event) => onChange(ifValid({ validate, pattern }, valueAs(event.target.value)));
	if (onChange) inputConfig.onChange = debounceOnChange ? debounce(onChangeHandler, debounceOnChange) : onChangeHandler;
	if (autoComplete) inputConfig.autoComplete = autoComplete;

	return <div className='field'>
		{label && <label htmlFor={id} className={labelClassName}>{label}:</label>}
		<input id={id} className={inputClassName} type={type} disabled={!!disabled} {...register(id, inputConfig)} />
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

function debounce(fn, wait = 1) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.call(this, ...args), wait);
	};
}