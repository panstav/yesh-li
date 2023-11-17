import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";

import Modal, { Title, useModal, useErrorModal } from "@wrappers/Modal";
import { EmailInput } from "@elements/Fields";
import Checkbox from "@elements/Checkbox";

import xhr from "@services/xhr";
import localDb from "@services/localDb";

import { noticeClassName } from ".";

export default function TrialNotice() {

	const [emailVerificationModal, showEmailVerificationModal] = useModal();
	const [emailVerificationFailedModal, showEmailVerificationFailedModal] = useErrorModal();

	const className = classNames("has-background-warning is-clickable has-text-centered py-2", noticeClassName);

	return <>

		<div onClick={() => showEmailVerificationModal()} className={className}>
			<b>עמוד זמני</b> הרשמו כעת על מנת לשמרו
		</div>

		<Modal {...emailVerificationModal} render={() => {

			const [sentEmail, setSentEmail] = useState(false);
			const [isSendingEmailForm, setIsSendingEmailForm] = useState(false);
			const [isSendingCodeForm, setIsSendingCodeForm] = useState(false);

			const emailEntryForm = useForm();
			const emailVerificationForm = useForm();

			const handlePaste = (event) => {
				event.preventDefault();
				const pastedText = event.clipboardData.getData('text/plain');
				if (!/[0-9]{4}/.test(pastedText)) return;
				const digits = pastedText.split('');
				emailVerificationForm.setValue('code1', digits[0]);
				emailVerificationForm.setValue('code2', digits[1]);
				emailVerificationForm.setValue('code3', digits[2]);
				emailVerificationForm.setValue('code4', digits[3]);
			};

			const handleDigitChange = (event) => {
				if (event.ctrlKey) return;
				event.preventDefault();
				const value = event.key.match(/[0-9]{1}/)?.[0] || '';
				if (!value) return;
				event.currentTarget.value = value;
				const nextInput = event.currentTarget.nextSibling;
				if (nextInput) nextInput.focus();
			};

			const submitEmailForm = emailEntryForm.handleSubmit(async (data) => {
				setIsSendingEmailForm(true);
				await xhr.verifyEmail(data);
				setSentEmail(true);
			});

			const submitCodeForm = emailVerificationForm.handleSubmit(async (data) => {
				setIsSendingCodeForm(true);
				const code = Object.values(data).join('');
				const { isVerified } = await xhr.verifyEmailCode(code);
				if (!isVerified) return showEmailVerificationFailedModal();
				localDb.set('email-recently-verified', true);
				window.location.reload();
			});

			const submitEmailButtonClassName = classNames("button is-primary is-fullwidth mt-4", isSendingEmailForm && "is-loading");
			const submitCodeButtonClassName = classNames("button is-primary is-fullwidth mt-4", isSendingCodeForm && "is-loading");

			if (!sentEmail) return <FormProvider {...emailEntryForm}>
				<Title>הרשמה</Title>
				<EmailInput
					label="כתובת מייל"
					id='email'
					autoComplete='email'
					description="כשתלחצו על &quot;המשך&quot; המערכת תשלח מייל עם קוד חד פעמי, כך נדע שכתובת המייל תקינה ושיש לך גישה אליה. עם כתובת זו אפשר יהיה להתחבר למערכת ללא צורך בסיסמה."
					labelClassName="mt-4" />
				<Checkbox id="consentUpgrades" label="אשמח לקבל עידכונים על שידרוגים ופיצ'רים חדשים" className="mb-1" />
				<Checkbox id="consentCommercial" label="אשמח לקבל עידכונים על מבצעים ושירותים נלווים" />
				<button onClick={submitEmailForm} className={submitEmailButtonClassName}>המשך</button>
			</FormProvider>;

			return <>
				<Title>אימות</Title>
				<div className="field">
					<label htmlFor="code1" className="label">הקוד שקיבלת למייל:</label>
					<div className="is-flex is-flex-direction-row-reverse is-flex-gap-3 is-justify-content-center">
						{[1, 2, 3, 4].map((i) => <input
							{...emailVerificationForm.register(`code${i}`, { required: true })}
							key={i}
							onPaste={handlePaste}
							onKeyDown={handleDigitChange}
							pattern="[0-9]"
							type="text"
							className="input has-text-centered"
							style={{ width: '5rem' }} />)}
					</div>
				</div>
				<button onClick={submitCodeForm} className={submitCodeButtonClassName}>המשך</button>
			</>;

		}} />

		<Modal {...emailVerificationFailedModal} render={() => <>
			אירעה שגיאה באימות כתובת המייל - נסו שנית מאוחר יותר
		</>} />

	</>;
}