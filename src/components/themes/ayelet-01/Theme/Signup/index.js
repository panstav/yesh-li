import { useState, useRef, useCallback, useContext } from 'react';

import { PageContext } from '@config/Page';

import xhr from '@services/xhr';
import { trackConversion } from '@lib/track-events';

import Component from './Signup';

export default function Form({ className }) {
	const { isSoldOutBool, dates, formSubmittionEventId } = useContext(PageContext);

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

		const lead = {
			'שם': name.value,
			'טלפון': phone.value,
			'מייל': email.value,
			'תאריכים': dates
		};

		xhr.createLead(lead)
			.then(() => {
				setSucceeded(true);
				if (formSubmittionEventId) trackConversion(formSubmittionEventId);
			});

	}, [ref, setValidation, setSucceeded]);

	const heading = isSoldOutBool ? 'עידכונים על הסדנאות הבאות' : 'לפרטים נוספים';
	const successMessage = isSoldOutBool ? 'מעולה! נעדכן כשתהיה סדנא נוספת' : 'מעולה! נשתמע בקרוב';

	const props = {
		formRef: ref,
		className,
		heading,
		succeeded,
		successMessage,
		resetValidation,
		validation,
		handleSubmit,
		isSoldOut: isSoldOutBool
	};

	return Component(props);

}