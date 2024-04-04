import { useFormContext } from "react-hook-form";

export default function UrlInputWithAddon({ id, label, prefix, validate, pattern, maxLength }) {
	const { register, getFieldState, formState } = useFormContext();
	const { error } = getFieldState(id, formState);

	const config = {
		required: true,
		validate,
		pattern
	};

	if (maxLength) config.maxLength = maxLength;

	return <>
		{label && <label className="label block" htmlFor={id}>{label}:</label>}
		<div className="field has-addons">
			<div className="control is-flex-grow-1">
				<input id={id} className="input is-ltr" type="text" {...register(id, config)} />
				{error?.message && <p className='help is-danger'>{error?.message}</p>}
			</div>
			<div className="control">
				<a className="button is-static is-ltr">{prefix}</a>
			</div>
		</div>
	</>;
}