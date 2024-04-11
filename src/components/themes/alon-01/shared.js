import { useFieldLabels } from "@hooks/use-i18n";

import { EmailInput, ImageInput, Select, TelInput, TextInput, UrlInput } from "@elements/Fields";

export function FullNameInput (props = {}) {
	const t = useFieldLabels();
	return <TextInput
		id="content.fullName"
		label={t.full_name}
		maxLength={20}
		autoComplete='name'
		{...props} />;
}

export function OccupationInput (props = {}) {
	const t = useFieldLabels();
	return <TextInput
		id="content.occupation"
		label={t.occupation}
		description={t.occupation_description}
		maxLength={30}
		autoComplete='organization-title'
		{...props} />;
}

export function MainColorSelect (props = {}) {
	const t = useFieldLabels();
	return <Select
		id="mainColor"
		label={t.main_color}
		oneOf={availableColors}
		{...props} />;
}

export function FeaturedImageFile (props = {}) {
	const t = useFieldLabels();
	return <ImageInput
		id="content.featuredImage"
		label={t.main_image}
		description={t.main_image_description}
		sizes={[450, 800, 1024, 1400]}
		{...props} />;
}

export function WhatsappContact (props = {}) {
	return <TelInput isSmall
		id={'content.links.whatsapp'}
		autoComplete='tel'
		{...props} />;
}

export function PhoneContact (props = {}) {
	return <TelInput isSmall
		id={'content.links.phone'}
		autoComplete='tel'
		{...props} />;
}

export function EmailContact (props = {}) {
	return <EmailInput isSmall
		id={'content.links.email'}
		autoComplete='email'
		{...props} />;
}

export function FacebookContact (props = {}) {
	return <UrlInput isSmall
		id={'content.links.facebook'}
		includes='facebook.com'
		{...props} />;
}

export const availableColors = [
	{ label: 'אדום', value: 'red' },
	{ label: 'כתום', value: 'orange' },
	{ label: 'צהוב', value: 'yellow' },
	{ label: 'ירוק', value: 'green' },
	{ label: 'טורקיז', value: 'teal' },
	{ label: 'כחול', value: 'blue' },
	{ label: 'ציאן', value: 'cyan' },
	{ label: 'סגול', value: 'purple' },
	{ label: 'אפור', value: 'gray' }
];