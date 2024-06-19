import classNames from 'classnames';

import { Checkmark } from '@elements/Icon';

import Heading from '../Heading';

export default function Form({ formRef, className, heading, succeeded, successMessage, resetValidation, validation, handleSubmit, isSoldOutBool }) {

	return <form {...{ ref: formRef, className }}>
		<Heading>{heading}:</Heading>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="signup-name">שמי</label>
				<input onChange={resetValidation} className="input" type="text" name="name" id="signup-name" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="signup-phone">אפשר לחזור אליי למספר</label>
				<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" id="signup-phone" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="signup-email">או בכתובת המייל</label>
				<input onChange={resetValidation} className="input" type="email" name="email" id="signup-email" />
			</div>
		</div>
		{validation && <div className="notification p-4 mt-5 is-warning">הרשמו עם כתובת מייל או טלפון 😉</div>}
		{succeeded && <div className="notification p-4 is-success">{successMessage}.</div>}
		<button onClick={handleSubmit} className="button is-fullwidth is-justify-content-center has-text-white has-text-weight-bold mt-4" style={{ background: 'linear-gradient(90deg, #fecb01 0%,#f18244 51%, #fecb01 100%)' }}>אשמח שתיצרו קשר</button>
		<p className='has-text-centered is-fullwidth is-size-7 mt-2'>
			{!isSoldOutBool && <span className='is-inline-block'><Check />נחזור אלייך בהקדם.</span>}
			<span className='is-inline-block'><Check />בלי ספאם.</span>
			{!isSoldOutBool && <span className='is-inline-block'><Check />אך ורק לצורך הסדנה.</span>}
		</p>
	</form>;

}

function Check({ className: classes, ...props }) {
	props.className = classNames('me-1 ms-2 has-text-success', classes);
	return <Checkmark {...props} />;
}