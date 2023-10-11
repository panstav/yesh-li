import { useContext } from "react";

import { PageContext } from "@config/Page";
import { Title } from "@wrappers/Modal";

export default function ContactForm ({ register, interest }) {

	const { content: { ctaHeader, submitText, sections } } = useContext(PageContext);

	return <>
		<Title>{ctaHeader}</Title>
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
				<select id="contact-interest" {...register('interest', { value: interest })}>
					<option value="">ביחרו מהרשימה</option>
					{sections.map(({ title }) => <option key={title} value={title}>{title}</option>)}
				</select>
			</div>
		</div>
		<button className="button is-justify-content-center is-fullwidth has-text-white has-text-weight-bold mt-4" style={{ background: `linear-gradient(90deg, var(--color-primary-200) 0%, var(--color-primary-400) 51%, var(--color-primary-200) 100%)` }}>{submitText}</button>
	</>;
}