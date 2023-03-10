import { useMemo } from 'react';

import classNames from 'classnames';

import { Checkmark } from '@elements/Icon';

import Heading from '@shared/shila/Heading';

export default function Form({ formName, formRef, className, heading, succeeded, successMessage, resetValidation, validation, handleSubmit, isSoldOut }) {

	const seed = useMemo(() => Math.floor(Math.random() * 1000), []);

	return <form name={formName} method="POST" {...{ ref: formRef, className }} netlify="true">
		<input type="hidden" name="form-name" value={formName} />
		<Heading>{heading}:</Heading>
		{succeeded && <div className="notification p-4 is-success">{successMessage}.</div>}
		<div className="block">
			<div className="field">
				<label className="label" htmlFor={`signup-name-${seed}`}>שמי</label>
				<input onChange={resetValidation} className="input" type="text" name="name" id={`signup-name-${seed}`} />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor={`signup-phone-${seed}`}>אפשר לחזור אליי למספר</label>
				<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" id={`signup-phone-${seed}`} />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor={`signup-email-${seed}`}>או בכתובת המייל</label>
				<input onChange={resetValidation} className="input" type="email" name="email" id={`signup-email-${seed}`} />
			</div>
		</div>
		{validation && <div className="notification p-4 mt-5 is-warning">הרשמו עם כתובת מייל או טלפון 😉</div>}
		<button onClick={handleSubmit} className="button is-fullwidth has-text-white has-text-weight-bold mt-4" style={{ background: 'linear-gradient(to right, #fecb01 0%,#f18244 51%, #fecb01 100%)' }}>אשמח שתיצרו קשר</button>
		<p className='has-text-centered is-fullwidth is-size-7 mt-2'>
			{!isSoldOut && <span className='is-inline-block'><Check />נחזור אלייך בהקדם.</span>}
			<span className='is-inline-block'><Check />בלי ספאם.</span>
			{!isSoldOut && <span className='is-inline-block'><Check />אך ורק לצורך הסדנה.</span>}
		</p>
	</form>;

}

function Check({ className: classes, ...props }) {
	props.className = classNames('ml-1 mr-2 has-text-success', classes);
	return <Checkmark {...props} />;
}