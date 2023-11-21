import Section from "@wrappers/Section";
import Modal, { Title, useModal, useSuccessModal } from "@wrappers/Modal";
import { Email, Faq } from "@elements/Icon";
import { EmailInput, TextArea, TextInput } from "@elements/Fields";

import xhr from "@services/xhr";

import { SectionTitle } from ".";

export default function FartherQuestions() {

	const [contactReceivedModal, showContactReceivedModal] = useSuccessModal();

	const [contactModal, showContactModal] = useModal({
		onSubmit: (data) => xhr.postEnquiry(data).then(showContactReceivedModal)
	});
	const openContactModal = () => showContactModal();

	return <>

		<Section isFullWidth>
			<SectionTitle>שאלות נוספות?</SectionTitle>
			<div className="is-flex-tablet is-flex-gap-3 has-text-centered-mobile">
				<div className="has-text-end-tablet" style={{ flex: 1 }}>
					<a href="mailto:hello@yesh.li" target="_blank" rel="noreferrer" className="button is-primary is-outlined is-medium is-rounded has-strong-radius">
						<Email />
						<span className="icon-text ms-2">לשלוח שאלה במייל</span>
					</a>
				</div>
				<span className="is-block" style={{ height: '0.5rem' }} />
				<div style={{ flex: 1 }}>
					<button onClick={openContactModal} className="button is-primary is-outlined is-medium is-rounded has-strong-radius">
						<Faq />
						<span className="icon-text ms-2">למלא טופס יצירת קשר</span>
					</button>
				</div>
			</div>
		</Section>

		<Modal {...contactModal} render={(() => {
			return <>
				<Title>יצירת קשר</Title>
				<TextInput id="name" label="שם" required={false} autoComplete="name" />
				<EmailInput id="email" label="כתובת מייל" autoComplete="email" />
				<TextArea id="message" label="השאלה שלך" />
				<div className="is-flex is-justify-content-end">
					<button className="button is-primary">שלח</button>
				</div>
			</>;
		})} />

		<Modal {...contactReceivedModal} render={(() => 'הודעתך התקבלה בהצלחה, נחזור אליך בהקדם האפשרי.')} />

	</>;
}