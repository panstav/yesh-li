import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { ImageInput, Select, TextInput, Repeater, RichEditor, UrlInput, TextArea } from "@elements/Fields";
import Details from "@elements/Details";
import xhr from "@services/xhr";

import { useFieldLabels } from "@hooks/use-i18n";

import { compoundField } from '@pages/Editor/index.module.sass';

import { EmailContact, FacebookContact, FeaturedImageFile, FullNameInput, MainColorSelect, OccupationInput, PhoneContact, WhatsappContact, availableColors } from "@themes/alon-01/shared";

export default function Alon_01 () {
	const t = useFieldLabels();
	const { setValue, getValues } = useFormContext();

	useEffect(updateTitle, []);

	return <>

		<Details title={t.about}>

			<FullNameInput
				onChange={updateTitle} />

			<OccupationInput
				onChange={updateTitle} />

			<div className={compoundField}>
				<TextArea
					id="content.statement.content"
					label={t.statement}
					description={t.statement_description}
					required={false}
					maxLength={200} />

				<TextInput
					id="content.statement.author"
					label={t.author}
					description={t.quote_can_have_author}
					required={false}
					maxLength={20} />
			</div>

			<RichEditor
				id="content.about"
				label={t.about}
				maxLength={1500} />

		</Details>

		<Details title={t.design}>

			<MainColorSelect />

			<FeaturedImageFile
				onChange={(favicon) => setValue('favicon', favicon)} />

		</Details>

		<Details title={t.connections}>

			<FacebookContact
				label={t.facebook}
				required={false} />

			<UrlInput isSmall
				id={'content.links.instagram'}
				label={t.instagram}
				required={false}
				includes='instagram.com' />

			<UrlInput isSmall
				id={'content.links.linkedin'}
				label={t.linkedin}
				required={false}
				includes='linkedin.com' />

			<UrlInput isSmall
				id={'content.links.twitter'}
				label={t.twitter}
				required={false}
				includes='twitter.com' />

			<UrlInput isSmall
				id={'content.links.pinterest'}
				label={t.pinterest}
				required={false}
				includes='pinterest.com' />

			<UrlInput isSmall
				id={'content.links.youtube'}
				label={t.youtube}
				required={false}
				includes='youtube.com' />

			<UrlInput isSmall
				id={'content.links.tiktok'}
				label={t.tiktok}
				required={false}
				includes='tiktok.com' />

			<WhatsappContact
				label={t.whatsapp}
				required={false} />

			<PhoneContact
				label={t.phone}
				required={false} />

			<EmailContact
				label={t.email}
				required={false} />

		</Details>

		<Details title={t.media}>
			<div className={compoundField}>
				<UrlInput isSmall
					id={'content.video.url'}
					label={t.youtube_url}
					required={false}
					includes='youtube.com/watch?v'
					setValueAs={(val) => val.split('&')[0]}
					onChange={(videoUrl) => {
						if (videoUrl) xhr.createYoutubeThumbnail({ videoUrl, siteSlug: getValues('slug') })
							.then(({ thumbnailPath }) => setValue('content.video.thumbnail', thumbnailPath));
					}} />

				<TextInput
					id={'content.video.title'}
					label={t.video_title}
					labelClassName="is-small"
					required={false}
					description={t.alt_description}
					maxLength={30} />
			</div>

			<Repeater
				arrayId="content.gallery"
				singleName={t.image}
				minLength="0" maxLength="10"
				uniquePropKey="srcSet"
				emptyItem={{
					alt: "",
					srcSet: "https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg"
				}}>
				{(id) => <ImageInput
					isCompoundField={false}
					hasNoFocus
					id={id}
					sizes={[600, 1024]} />}
			</Repeater>

		</Details>

		<Details title={t.services}>
			<Repeater
				arrayId="content.sections"
				singleName={t.service}
				minLength="0" maxLength="6"
				uniquePropKey="srcSet"
				emptyItem={(data) => ({
					title: t.title,
					color: data.mainColor,
					content: t.short_description,
					ctaText: t.invitation
				})}>{(id) => <>

					<Select
						id={`${id}.color`}
						label={t.color}
						oneOf={availableColors} />

					<TextInput
						id={`${id}.title`}
						label={t.title}
						maxLength={30} />

					<RichEditor
						id={`${id}.content`}
						label={t.description}
						maxLength={250} />

					<TextInput
						id={`${id}.ctaText`}
						label={t.choose_service_button}
						description={t.choose_service_button_help}
						maxLength={15} />

				</>}
			</Repeater>
		</Details>

		<Details title={t.faq}>
			<Repeater
				arrayId="content.faq"
				singleName={t.question_and_answer}
				minLength="0" maxLength="10"
				uniquePropKey="question"
				emptyItem={{
					question: '',
					answer: ''
				}}>{(id) => <>

					<TextInput
						id={`${id}.question`}
						label={t.question}
						maxLength={30} />

					<RichEditor
						id={`${id}.answer`}
						label={t.answer}
						maxLength={750} />

				</>}
			</Repeater>
		</Details>

	</>;

	function updateTitle() {
		const fullName = getValues('content.fullName');
		const occupation = getValues('content.occupation');
		const newTitle = `${occupation} • ${fullName}`;
		if (newTitle !== getValues('title')) setValue('title', newTitle);
	}

}