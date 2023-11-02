import { EmailInput, ImageInput, Select, TelInput, TextInput, UrlInput } from "@elements/Fields";

import copy from "@pages/Editor/copy";

export function FullNameInput (props = {}) {
	return <TextInput
		id="content.fullName"
		label={copy.fullName}
		maxLength={20}
		autoComplete='name'
		{...props} />;
}

export function OccupationInput (props = {}) {
	return <TextInput
		id="content.occupation"
		label={copy.occupation}
		description={copy.occupationDescription}
		maxLength={30}
		autoComplete='organization-title'
		{...props} />;
}

export function MainColorSelect (props = {}) {
	return <Select
		id="mainColor"
		label={copy.mainColor}
		oneOf={availableColors}
		{...props} />;
}

export function FeaturedImageFile (props = {}) {
	return <ImageInput
		id="content.featuredImage"
		label={copy.mainImage}
		description={copy.mainImageDescription}
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