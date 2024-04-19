import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';

import useI18n from '@hooks/use-i18n';

import regexes from '@lib/regexes';

export default function VerificationCode({ email, buttonClassName, onChange }) {

	const [{ Login: t }] = useI18n();

	const [isSendingCodeForm, setIsSendingCodeForm] = useState(false);
	const [helpText, setHelpText] = useState(false);

	const form = useForm();

	const onSubmit = form.handleSubmit(async (data) => {
		const code = Object.values(data).join('');
		setIsSendingCodeForm(true);
		const { isConfirmed } = await xhr.confirmLoginCode({ email, code });
		setIsSendingCodeForm(false);
		if (!isConfirmed) return setHelpText(t.bad_verification_code);
		window.location.href = `/editor?loginCode=${code}`;
	});

	const handlePaste = (event) => {
		event.preventDefault();

		onChange();
		setHelpText(false);

		const pastedText = event.clipboardData.getData('text/plain');
		if (!regexes.first4Digits.test(pastedText)) return setHelpText(t.digitsOnlyWhileYouPasted(pastedText));

		const digits = pastedText.match(/[0-9]{4}/)[0].split('');
		form.setValue('code1', digits[0]);
		form.setValue('code2', digits[1]);
		form.setValue('code3', digits[2]);
		form.setValue('code4', digits[3]);
	};

	const handleDigitChange = (event) => {
		if (event.ctrlKey) return;
		event.preventDefault();

		onChange();
		setHelpText(false);

		const value = event.key.match(regexes.firstDigit)?.[0] || '';
		if (!value) return;

		event.currentTarget.value = value;
		const nextInput = event.currentTarget.nextSibling;
		if (nextInput) nextInput.focus();
	};

	const submitCodeButtonClassName = classNames(buttonClassName, isSendingCodeForm && "is-loading");

	return <>
		<div className="field">
			<label htmlFor="code1" className="label">{t.code_you_received}:</label>
			<div className="is-flex is-flex-direction-row-reverse is-flex-gap-3 is-justify-content-center">
				{[1, 2, 3, 4].map((i) => <input
					{...form.register(`code${i}`, { required: true })}
					key={i}
					onPaste={handlePaste}
					onKeyDown={handleDigitChange}
					pattern="[0-9]"
					type="text"
					className="input has-text-centered"
					style={{ width: '5rem' }} />)}
			</div>
			{helpText && <p className='help has-text-danger has-text-centered mt-3'>{helpText}</p>}
		</div>
		<button onClick={onSubmit} className={submitCodeButtonClassName}>{t.email_address_verification}</button>
	</>;

}