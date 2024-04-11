import { useFormContext } from "react-hook-form";

import { useFieldLabels } from "@hooks/use-i18n";

export default function Select({ id, label, oneOf, required = true }) {

	const t = useFieldLabels();
	const { register, getValues } = useFormContext();

	const config = { required: required && t.required_field };
	if (!getValues(id)) config.value = '';

	return <div className="field">
		<label htmlFor={id} className="label">{label}:</label>
		<div className="select is-fullwidth">
			<select id={id} {...register(id, config)}>
				<option value="" disabled>{t.select_label}</option>
				{oneOf.map(({ label, value }) => <option key={label} value={value}>{label}</option>)}
			</select>
		</div>
	</div>;
}