import { useState, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';

import { Checkmark } from '@elements/Icon';

import { PageContext } from "./index";
import Heading from './_elements/Heading';

export default function Form({ className }) {

	const { emailAddress: toAddress } = useContext(PageContext);

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const resetValidation = useCallback(() => {
		setValidation(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { name, phone, email } = ref.current.elements;

		if (!phone.value && !email.value) return setValidation(true);

		send({ name: name.value, phone: phone.value, email: email.value, toAddress })
			.then(() => setSucceeded(true));
	}, [ref, setValidation, setSucceeded, toAddress]);

	return <form {...{ ref, className }}>
		<Heading>לפרטים נוספים:</Heading>
		{succeeded && <div className="notification p-4 is-success">מעולה! נשתמע בקרוב.</div>}
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="name">שמי</label>
				<input onChange={resetValidation} className="input" type="text" name="name" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="phone">אפשר לחזור אליי למספר</label>
				<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="email">או בכתובת המייל</label>
				<input onChange={resetValidation} className="input" type="email" name="email" />
			</div>
		</div>
		{validation && <div className="notification p-4 mt-5 is-warning">אם תשאירו מייל או טלפון - נוכל גם לחזור אליכם 😉</div>}
		<button onClick={handleSubmit} className="button is-fullwidth is-primary has-text-white has-text-weight-bold mt-4">תחזרו אליי בבקשה</button>
		<p className='has-text-centered has-text-grey is-fullwidth is-size-7 mt-2'>
			<span className='is-inline-block'><Check />נחזור אלייך בהקדם.</span>
			<span className='is-inline-block'><Check />בלי ספאם.</span>
			<span className='is-inline-block'><Check />אך ורק לצורך הסדנה.</span>
		</p>
	</form>;

}

function Check({ className: classes, ...props }) {
	props.className = classNames('ml-1 mr-2 has-text-success', classes);
	return <Checkmark {...props} />;
}

function send({ toAddress, ...data }) {
	fetch(`https://formsubmit.co/ajax/${toAddress}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error));
}