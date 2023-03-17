import { useState, useRef, useCallback, useContext } from 'react';

import isBrowser from '@lib/is-browser';
import { trackConversion } from '@lib/track-events';

import { PageContext } from "@shared/shila/contexts";

import Component from './Signup';

export default function Form({ className }) {

	const { isSoldOut, dates, formSubmittionEventId } = useContext(PageContext);
	const formName = `signup-samar-shila-${dates}`;

	const ref = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const resetValidation = useCallback(() => {
		setValidation(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { phone, email } = ref.current.elements;

		if (!phone.value && !email.value) return setValidation(true);

		const formElem = ref.current;
		const formData = new FormData(formElem);

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString(),
		}).then(() => {
			setSucceeded(true);
			if (formSubmittionEventId) trackConversion(formSubmittionEventId);
		});

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