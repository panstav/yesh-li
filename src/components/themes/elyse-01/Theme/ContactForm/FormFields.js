import { useFormContext } from "react-hook-form";

import useSiteData from "@hooks/use-site-data";

export default function FormFields ({ isSuccess, isError }) {
	const { register } = useFormContext();
	const { content: { submitText, sections } } = useSiteData();
	return <>
		<div className="field">
			<label className="label" htmlFor="contact-name">שם:</label>
			<input className="input" type="text" id="contact-name" autoComplete="name" {...register('name')} />
		</div>
		<div className="field">
			<label className="label" htmlFor="contact-email">כתובת מייל:</label>
			<input className="input" type="email" id="contact-email" autoComplete="email" {...register('email', { required: 'אצור איתך קשר בכתובת הזו' })} />
		</div>
		<div className="field">
			<label htmlFor="contact-interest" className="label">הכי מעניין אותי:</label>
			<div className="select is-fullwidth">
				<select id="contact-interest" {...register('interest')}>
					<option value="">ביחרו מהרשימה</option>
					{sections.map(({ label }, index) => <option key={index} value={label}>{label}</option>)}
				</select>
			</div>
		</div>
		<button className="button block is-justify-content-center is-fullwidth has-text-white has-text-weight-bold mt-4" style={{ background: `linear-gradient(90deg, var(--color-primary-half) 0%, var(--color-primary) 51%, var(--color-primary-half) 100%)` }}>{submitText}</button>
		{isError && <div className="notification has-background-warning-light p-4">שגיאת מערכת, נסו שוב מאוחר יותר.</div>}
		{isSuccess && <div className="notification has-background-success-light p-4">אחלה, נשתמע!</div>}
	</>;
}