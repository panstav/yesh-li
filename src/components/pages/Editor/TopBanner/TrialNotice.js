import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";

import xhr from "@services/xhr";
import useI18n from "@hooks/use-i18n";

import Modal, { Title, useModal } from "@wrappers/Modal";
import { EmailInput } from "@elements/Fields";
import Checkbox from "@elements/Checkbox";

import { noticeClassName } from ".";

export default function TrialNotice({ className: classes }) {

	const [i18n, { Editor: { TrialNotice: t } }] = useI18n();

	const [emailVerificationModal, showEmailVerificationModal] = useModal();

	const className = classNames("has-background-warning is-clickable has-text-centered py-2", noticeClassName, classes);

	return <>

		<div onClick={() => showEmailVerificationModal()} className={className}>
			<b>{t.page_is_temporary}</b> {t.signup_to_keep}
		</div>

		<Modal {...emailVerificationModal} render={() => {

			const [sentEmail, setSentEmail] = useState(false);
			const [isSendingEmailForm, setIsSendingEmailForm] = useState(false);

			const emailEntryForm = useForm();

			const submitEmailForm = emailEntryForm.handleSubmit(async (data) => {
				setIsSendingEmailForm(true);
				await xhr.sendRegistrationEmail(data);
				setSentEmail(true);
			});

			const emailAddress = emailEntryForm.getValues('email');
			const providerUrl = emailAddress && `https://${emailAddress.split('@')[1]}`;

			const submitEmailButtonClassName = classNames("button is-primary is-fullwidth mt-4", isSendingEmailForm && "is-loading");

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

			return <div className="notification has-text-centered has-background-success-light p-4">{t.link_successfully_sent_to}<a href={providerUrl} className='has-text-weight-bold'>{emailAddress}</a></div>;
		}} />

	</>;
}