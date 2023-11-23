import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { ImageInput, Select, TextInput, Repeater, RichEditor, UrlInput, TextArea } from "@elements/Fields";
import Details from "@elements/Details";
import xhr from "@services/xhr";

import copy from '@pages/Editor/copy';
import { compoundField } from '@pages/Editor/index.module.sass';

import { EmailContact, FacebookContact, FeaturedImageFile, FullNameInput, MainColorSelect, OccupationInput, PhoneContact, WhatsappContact, availableColors } from "@themes/alon-01/shared";

export default function Alon_01 () {
	const { setValue, getValues } = useFormContext();

	useEffect(updateTitle, []);

	return <>

		<Details title='אודות'>

			<FullNameInput
				onChange={updateTitle} />

			<OccupationInput
				onChange={updateTitle} />

			<div className={compoundField}>
				<TextArea
					id="content.statement.content"
					label={copy.statement}
					description={copy.statementDescription}
					required={false}
					maxLength={200} />

				<TextInput
					id="content.statement.author"
					label="מחבר"
					description='אם בחרת בציטוט למשפט המפתח, אפשר לציין כאן את שם המצוטט.'
					required={false}
					maxLength={20} />
			</div>

			<RichEditor
				id="content.about"
				label={copy.about}
				maxLength={1500} />

		</Details>

		<Details title='עיצוב'>

			<MainColorSelect />

			<FeaturedImageFile
				onChange={(favicon) => setValue('favicon', favicon)} />

		</Details>

		<Details title='קישורים'>

			<FacebookContact
				label={copy.facebook}
				required={false} />

			<UrlInput isSmall
				id={'content.links.instagram'}
				label={copy.instagram}
				required={false}
				includes='instagram.com' />

			<UrlInput isSmall
				id={'content.links.linkedin'}
				label={copy.linkedin}
				required={false}
				includes='linkedin.com' />

			<UrlInput isSmall
				id={'content.links.twitter'}
				label={copy.twitter}
				required={false}
				includes='twitter.com' />

			<UrlInput isSmall
				id={'content.links.pinterest'}
				label={copy.pinterest}
				required={false}
				includes='pinterest.com' />

			<UrlInput isSmall
				id={'content.links.youtube'}
				label={copy.youtube}
				required={false}
				includes='youtube.com' />

			<UrlInput isSmall
				id={'content.links.tiktok'}
				label={copy.tiktok}
				required={false}
				includes='tiktok.com' />

			<WhatsappContact
				label={copy.whatsapp}
				required={false} />

			<PhoneContact
				label={copy.phone}
				required={false} />

			<EmailContact
				label={copy.email}
				required={false} />

		</Details>

		<Details title='מדיה'>
			<div className={compoundField}>
				<UrlInput isSmall
					id={'content.video.url'}
					label="כתובת סרטון יוטיוב"
					required={false}
					includes='youtube.com/watch?v'
					setValueAs={(val) => val.split('&')[0]}
					onChange={(videoUrl) => {
						if (videoUrl) xhr.postYoutubeThumbnail({ videoUrl, siteSlug: getValues('slug') })
							.then(({ thumbnailPath }) => setValue('content.video.thumbnail', thumbnailPath));
					}} />

				<TextInput
					id={'content.video.title'}
					label="כותרת לסרטון"
					labelClassName="is-small"
					required={false}
					description={copy.altDescription}
					maxLength={30} />
			</div>

			<Repeater
				arrayId="content.gallery"
				singleName="תמונה"
				minLength="0" maxLength="10"
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

		<Details title='שירותים'>
			<Repeater
				arrayId="content.sections"
				singleName="שירות"
				minLength="0" maxLength="6"
				emptyItem={(data) => ({
					title: 'כותרת',
					color: data.mainColor,
					content: 'תיאור',
					ctaText: 'הזמנה'
				})}>{(id) => <>

					<Select
						id={`${id}.color`}
						label="צבע"
						oneOf={availableColors} />

					<TextInput
						id={`${id}.title`}
						label="כותרת"
						maxLength={30} />

					<RichEditor
						id={`${id}.content`}
						label='תיאור'
						maxLength={250} />

					<TextInput
						id={`${id}.ctaText`}
						label="טקסט על כפתור הבחירה בשירות"
						description='ביחרו צמד מילים שמביע את האופן שבו ניתן להנות מהשירות, למשל "הזמנה" או "הרשמה".'
						maxLength={15} />

				</>}
			</Repeater>
		</Details>

		<Details title='שאלות נפוצות'>
			<Repeater
				arrayId="content.faq"
				singleName="שאלה ותשובה"
				minLength="0" maxLength="10"
				emptyItem={{
					question: '',
					answer: ''
				}}>{(id) => <>

					<TextInput
						id={`${id}.question`}
						label="שאלה"
						maxLength={30} />

					<RichEditor
						id={`${id}.answer`}
						label="תשובה"
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