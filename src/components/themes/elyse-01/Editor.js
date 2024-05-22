import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useFieldLabels } from "@hooks/use-i18n";

import { ImageInput, Select, TextInput, Repeater, RichEditor, UrlInput, TextArea, TelInput, EmailInput } from "@elements/Fields";
import Details from "@elements/Details";

export default function Elyse_01 () {
	const t = useFieldLabels();
	const { setValue, getValues } = useFormContext();

	useEffect(updateTitle, []);

	return <>
		<Details title={t.about}>
			<TextInput
				id="content.fullName"
				label={t.full_name}
				maxLength={20}
				onChange={updateTitle} />

			<TextInput
				id="content.occupation"
				label={t.occupation}
				description={t.occupation_description}
				maxLength={30}
				onChange={updateTitle} />

			<TextArea
				id="content.description"
				label={t.description}
				description={t.description_description}
				maxLength={150} />

			<TextArea
				id="content.statement"
				label={t.statement}
				description={t.statement_description}
				required={false}
				maxLength={200} />
		</Details>

		<Details title={t.design}>
			<Select
				id="mainColor"
				label={t.main_color}
				oneOf={[
					{ label: t.blue, value: 'blue' },
					{ label: t.green, value: 'green' },
					{ label: t.yellow, value: 'yellow' },
					{ label: t.red, value: 'red' },
					{ label: t.purple, value: 'purple' }
				]} />

			<ImageInput
				id="content.portrait"
				label={t.main_image}
				description={t.main_image_description}
				sizes={[450, 800]} />
		</Details>

		<Details title={t.services}>
			<Repeater
				arrayId="content.sections"
				singleName={t.service}
				minLength="3" maxLength="6"
				uniquePropKey="label"
				emptyItem={(data) => ({
					label: t.new_service_title,
					color: data.mainColor,
					content: t.new_service_description,
					ctaText: t.order_cta,
					image: {
						// https://placehold.jp/d9d9d9/ffffff/250x250.jpg?text=תמונה זמנית
						srcSet: 'https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg',
						alt: ''
					}
				})}>{(id) => <>

					<Select
						id={`${id}.color`}
						label={t.color}
						oneOf={[
							{ label: t.blue, value: 'blue' },
							{ label: t.green, value: 'green' },
							{ label: t.yellow, value: 'yellow' },
							{ label: t.red, value: 'red' },
							{ label: t.purple, value: 'purple' }
						]} />

					<TextInput
						id={`${id}.label`}
						label={t.title}
						maxLength={30} />

					<ImageInput
						id={`${id}.image`}
						label={t.image_beside_service}
						sizes={[450]} />

					<RichEditor
						id={`${id}.content`}
						label={t.description} />

					<TextInput
						id={`${id}.ctaText`}
						label={t.service_cta}
						description={t.service_cta_description}
						maxLength={15} />

				</>}
			</Repeater>
		</Details>

		<Details title={t.contact_form}>
			<TextInput
				id="content.ctaHeader"
				label={t.contact_form_title}
				maxLength={50} />

			<TextInput
				id="content.submitText"
				label={t.contact_form_cta}
				description={t.contact_form_cta_description}
				maxLength={15} />
		</Details>

		<Details title={t.connections}>

			<UrlInput isSmall
				id={'content.socials.facebook'}
				label={t.facebook}
				required={false}
				includes='facebook.com' />

			<UrlInput isSmall
				id={'content.socials.instagram'}
				label={t.instagram}
				required={false}
				includes='instagram.com' />

			<UrlInput isSmall
				id={'content.socials.linkedin'}
				label={t.linkedin}
				required={false}
				includes='linkedin.com' />

			<UrlInput isSmall
				id={'content.socials.twitter'}
				label={t.twitter}
				required={false}
				includes='twitter.com' />

			<UrlInput isSmall
				id={'content.socials.pinterest'}
				label={t.pinterest}
				required={false}
				includes='pinterest.com' />

			<UrlInput isSmall
				id={'content.socials.youtube'}
				label={t.youtube}
				required={false}
				includes='youtube.com' />

			<UrlInput isSmall
				id={'content.socials.tiktok'}
				label={t.tiktok}
				required={false}
				includes='tiktok.com' />

			<TelInput isSmall
				id={'content.socials.whatsapp'}
				label={t.whatsapp}
				required={false} />

			<TelInput isSmall
				id={'content.socials.phone'}
				label={t.phone}
				required={false} />

			<EmailInput isSmall
				id={'content.socials.email'}
				label={t.email}
				required={false} />

		</Details>
	</>;

	function updateTitle() {
		const fullName = getValues('content.fullName');
		const occupation = getValues('content.occupation');
		const newTitle = `${occupation} • ${fullName}`;
		if (newTitle !== getValues('title')) setValue('title', newTitle);
	}

}
