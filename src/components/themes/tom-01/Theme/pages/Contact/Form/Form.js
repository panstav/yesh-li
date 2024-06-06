import { buttonPrimaryColor } from "@themes/tom-01/Theme/lib/css";

const formName = 'tom-contact';

export default function Form({ formRef, succeeded, resetValidation, validation, handleSubmit }) {
	return <form name={formName} ref={formRef}>
		<input type="hidden" name="form-name" value={formName} />
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="contactForm-name">Name:</label>
				<input onChange={resetValidation} className="input" type="text" name="name" id="contactForm-name" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="contactForm-phone">Phone number: <i className="has-text-grey">(Optional)</i></label>
				<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" id="contactForm-phone" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="contactForm-email">Email address:</label>
				<input onChange={resetValidation} className="input" type="email" name="email" id="contactForm-email" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="contactForm-message">Your message:</label>
				<textarea onChange={resetValidation} className="textarea" name="message" id="contactForm-message" />
			</div>
		</div>
		{succeeded && <div className="notification p-4 is-success">Great! We&apos;ll be in touch.</div>}
		{validation && <div className="notification p-4 mt-5 is-warning">Your phone number is optional, please fill the rest of this form.</div>}
		<button onClick={handleSubmit} className="button is-fullwidth has-text-white has-text-weight-bold mt-4" style={buttonPrimaryColor}>
			Submit
		</button>
	</form>;
}