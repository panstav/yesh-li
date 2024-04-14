import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";

import xhr from "@services/xhr";
import localDb from "@services/localDb";
import regexes from "@lib/regexes";

import useI18n from "@hooks/use-i18n";

import Modal, { Title, useModal, useErrorModal } from "@wrappers/Modal";
import { EmailInput } from "@elements/Fields";
import Checkbox from "@elements/Checkbox";


import { noticeClassName } from ".";
import { reportConversion } from "@elements/GoogleAnalytics";

export default function TrialNotice() {

	const [i18n, { Editor: { TrialNotice: t } }] = useI18n();

	const [emailVerificationModal, showEmailVerificationModal] = useModal();
	const [emailVerificationFailedModal, showEmailVerificationFailedModal] = useErrorModal();

	const className = classNames("has-background-warning is-clickable has-text-centered py-2", noticeClassName);

	return <>

		<div onClick={() => showEmailVerificationModal()} className={className}>
			<b>{t.page_is_temporary}</b> {t.signup_to_keep}
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
				if (!regexes.first4Digits.test(pastedText)) return;
				const digits = pastedText.split('');
				emailVerificationForm.setValue('code1', digits[0]);
				emailVerificationForm.setValue('code2', digits[1]);
				emailVerificationForm.setValue('code3', digits[2]);
				emailVerificationForm.setValue('code4', digits[3]);
			};

			const handleDigitChange = (event) => {
				if (event.ctrlKey) return;
				event.preventDefault();
				const value = event.key.match(regexes.firstDigit)?.[0] || '';
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
				reportConversion('bPwnCNDS7PkYEL3xkrYp');
				localDb.set('email-recently-verified', true);
				window.location.reload();
			});

			const submitEmailButtonClassName = classNames("button is-primary is-fullwidth mt-4", isSendingEmailForm && "is-loading");
			const submitCodeButtonClassName = classNames("button is-primary is-fullwidth mt-4", isSendingCodeForm && "is-loading");

			if (!sentEmail) return <FormProvider {...emailEntryForm}>
				<Title>{t.registration}</Title>
				<EmailInput
					label={i18n.misc.email_address}
					id='email'
					autoComplete='email'
					description={t.email_validation_instruction}
					labelClassName="mt-4" />
				<Checkbox id="consentUpgrades" label={t.upgrades_updates_consent} className="mb-1" />
				<Checkbox id="consentCommercial" label={t.products_services_updates_consent} />
				<button onClick={submitEmailForm} className={submitEmailButtonClassName}>{i18n.misc.continue}</button>
			</FormProvider>;

			return <>
				<Title>{t.validation}</Title>
				<div className="field">
					<label htmlFor="code1" className="label">{t.code_you_received}:</label>
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
				<button onClick={submitCodeForm} className={submitCodeButtonClassName}>{i18n.misc.email_address}</button>
			</>;

		}} />

		<Modal {...emailVerificationFailedModal} render={() => t.validation_error_try_again} />

	</>;
}