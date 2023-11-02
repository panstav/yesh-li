import { useFormContext } from "react-hook-form";

import { Step } from "@pages/Onboarding";

import { FeaturedImageFile, FullNameInput, MainColorSelect, WhatsappContact, PhoneContact, EmailContact, FacebookContact, OccupationInput } from "@themes/alon-01/shared";
import Checkbox from "@elements/Checkbox";

import copy from "@pages/Editor/copy";

export default function Onboarding() {
	return <>
		<Step title="פרטים כלליים">

			<FullNameInput
				description="יופיע בכותרת העמוד ובשורת זכויות היוצרים" />

			<OccupationInput />

		</Step>
		<Step title="עיצוב">

			<MainColorSelect />

			<FeaturedImageFile hasNoFocus />

		</Step>
		<Step title="יצירת קשר">
			<ContactStep />
		</Step>
	</>;
}

function ContactStep () {
	const { watch } = useFormContext();

	const contactMethods = watch('contactMethods');

	return <>
		<h2 className="is-size-5 mb-4">איך לקוחות יוצרים איתכם קשר?</h2>
		<div className="mt-2"><Checkbox id="contactMethods.whatsapp" label={<b>{copy.whatsapp}{contactMethods?.whatsapp ? ':' : ''}</b>} /></div>
		{contactMethods?.whatsapp && <WhatsappContact />}
		<div className="mt-2"><Checkbox id="contactMethods.phone" label={<b>{copy.phone}{contactMethods?.phone ? ':' : ''}</b>} /></div>
		{contactMethods?.phone && <PhoneContact />}
		<div className="mt-2"><Checkbox id="contactMethods.email" label={<b>{copy.email}{contactMethods?.email ? ':' : ''}</b>} /></div>
		{contactMethods?.email && <EmailContact />}
		<div className="mt-2"><Checkbox id="contactMethods.facebook" label={<b>{copy.facebook}{contactMethods?.facebook ? ':' : ''}</b>} /></div>
		{contactMethods?.facebook && <FacebookContact />}
	</>;

}