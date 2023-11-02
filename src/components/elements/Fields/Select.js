import { useFormContext } from "react-hook-form";

import copy from '@pages/Editor/copy';

export default function Select({ id, label, oneOf, required = true }) {
	const { register, getValues } = useFormContext();
	const config = { required: required && copy.requiredField };
	if (!getValues(id)) config.value = '';
	return <div className="field">
		<label htmlFor={id} className="label">{label}:</label>
		<div className="select is-fullwidth">
			<select id={id} {...register(id, config)}>
				<option value="" disabled>ביחרו מהרשימה</option>
				{oneOf.map(({ label, value }) => <option key={label} value={value}>{label}</option>)}
			</select>
		</div>
	</div>;
}