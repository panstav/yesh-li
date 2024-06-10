import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import Icon from '@elements/Icon/Icon';

const emailValidationRegexp = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function SignupForUpdates({ className }) {

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const resetValidation = useCallback(() => {
		setValidation(false);
		setSucceeded(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { email } = ref.current.elements;
		const isValid = emailValidationRegexp.test(email.value);
		if (!email.value || !isValid) return setValidation(true);

		const formElem = ref.current;
		const formData = new FormData(formElem);

		console.log(new URLSearchParams(formData).toString());
		setSucceeded(true);

	}, [ref, setValidation, setSucceeded]);

	const inputClassName = classNames('input mb-2', validation && 'is-danger');

	// eslint-disable-next-line react/no-unknown-property
	return <form ref={ref} className={className} style={{ minWidth: '12rem' }}>
		<label htmlFor="signup-for-updates-email-input">
			<h3 className="mb-2">Sign up and get blog updates by mail.</h3>
		</label>
		<input id="signup-for-updates-email-input" className={inputClassName} onChange={resetValidation} type="email" placeholder="Email address" name="email" />
		{succeeded
			? <button className="button is-success">
				<CheckMark className="mr-2" style={{ width: '1rem' }} />
				<span className="icon-text">Thank you :)</span>
			</button>
			: <button onClick={handleSubmit} className="button is-info">
				Subscribe
			</button>}
	</form>;

}

function CheckMark(props) {
	return <Icon size={18} {...props}>
		<path xmlns="http://www.w3.org/2000/svg" d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27   c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0   L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z" />
	</Icon>;
}