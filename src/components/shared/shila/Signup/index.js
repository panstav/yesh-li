import { useState, useRef, useCallback, useContext, useEffect } from 'react';

import { PageContext } from "@shared/shila/contexts";

import Component from './Signup';

export default function Form({ className }) {

	const { isSoldOut, dates } = useContext(PageContext);
	const formName = `signup-samar-shila-${dates}`;

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	useEffect(() => {
		if (window.location.href.includes('form-submitted')) {
			setSucceeded(true);
		} else {
			document.querySelector(`form[name="${formName}"]`).setAttribute('action', window.location.href + '?form-submitted');
		}
	}, []);

	const resetValidation = useCallback(() => {
		setValidation(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { phone, email } = ref.current.elements;

		if (!phone.value && !email.value) return setValidation(true);

		const formElem = event.target;
		const formData = new FormData(formElem);
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString(),
		}).then(() => navigate(window.location.href + (window.location.search ? '&' : '?') + 'form-submitted'));

	}, [ref, setValidation, setSucceeded]);

	const heading = isSoldOut ? 'עידכונים על הסדנאות הבאות' : 'לפרטים נוספים';
	const successMessage = isSoldOut ? 'מעולה! נעדכן כשתהיה סדנא נוספת' : 'מעולה! נשתמע בקרוב';

	const props = {
		formName,
		formRef: ref,
		className,
		heading,
		succeeded,
		successMessage,
		resetValidation,
		validation,
		handleSubmit,
		isSoldOut
	};

	return Component(props);

}