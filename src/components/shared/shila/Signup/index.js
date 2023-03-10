import { useState, useRef, useCallback, useContext, useEffect } from 'react';

import { PageContext } from "@shared/shila/contexts";

import Component from './Signup';

export default function Form({ className }) {

	const { isSoldOut, title, dates } = useContext(PageContext);

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	// useEffect(() => {
	// 	if (window.location.href.includes('form-submitted')) {
	// 		setSucceeded(true);
	// 	} else {
	// 		document.querySelector('input[name="_next"]').value = window.location.href + '?form-submitted';
	// 		document.querySelector('input[name="_url"]').value = window.location.href;
	// 	}
	// }, []);

	const resetValidation = useCallback(() => {
		setValidation(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { phone, email } = ref.current.elements;

		if (!phone.value && !email.value) return setValidation(true);

		ref.current.submit();
	}, [ref, setValidation, setSucceeded]);

	const heading = isSoldOut ? 'עידכונים על הסדנאות הבאות' : 'לפרטים נוספים';
	const successMessage = isSoldOut ? 'מעולה! נעדכן כשתהיה סדנא נוספת' : 'מעולה! נשתמע בקרוב';

	const props = {
		formId: `signup-${title}-${dates}`,
		redirectUrl: window.location.href + '?form-submitted',
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