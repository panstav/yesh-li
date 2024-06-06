import { useState, useRef, useCallback } from 'react';

import Component from './Form';

export default function Form() {

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const resetValidation = useCallback(() => {
		setValidation(false);
		setSucceeded(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { email, message } = ref.current.elements;

		if (!email.value || !message.value) return setValidation(true);

		const formElem = ref.current;
		const formData = new FormData(formElem);

		console.log(new URLSearchParams(formData).toString());
		setSucceeded(true);

	}, [ref, setValidation, setSucceeded]);

	const props = {
		formRef: ref,
		succeeded,
		resetValidation,
		validation,
		handleSubmit
	};

	return Component(props);
}