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

	const internal = watch('internal');

	return <>
		<h2 className="is-size-5 mb-4">איך לקוחות יוצרים איתכם קשר?</h2>
		<div className="mt-2"><Checkbox id="internal.contactMethods.whatsapp" label={<b>{copy.whatsapp}{internal?.contactMethods?.whatsapp ? ':' : ''}</b>} /></div>
		{internal?.contactMethods?.whatsapp && <WhatsappContact />}
		<div className="mt-2"><Checkbox id="internal.contactMethods.phone" label={<b>{copy.phone}{internal?.contactMethods?.phone ? ':' : ''}</b>} /></div>
		{internal?.contactMethods?.phone && <PhoneContact />}
		<div className="mt-2"><Checkbox id="internal.contactMethods.email" label={<b>{copy.email}{internal?.contactMethods?.email ? ':' : ''}</b>} /></div>
		{internal?.contactMethods?.email && <EmailContact />}
		<div className="mt-2"><Checkbox id="internal.contactMethods.facebook" label={<b>{copy.facebook}{internal?.contactMethods?.facebook ? ':' : ''}</b>} /></div>
		{internal?.contactMethods?.facebook && <FacebookContact />}
	</>;

}