import { useFormContext } from "react-hook-form";

import { Details, ImageInput, Select, TextInput, Repeater, RichEditor, UrlInput, TextArea, EmailInput, TelInput } from "@pages/Editor/Fields";
import xhr from "@services/xhr";

import { compoundField } from '@pages/Editor/index.module.sass';
import copy from '@pages/Editor/copy';

const availableColors = [
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

export default function Alon_01 () {
	const { setValue, getValues } = useFormContext();

	return <>

		<Details title='אודות'>
			<TextInput
				id="content.fullName"
				label={copy.fullName}
				maxLength={20} />

			<TextInput
				id="content.occupation"
				label={copy.occupation}
				description={copy.occupationDescription}
				maxLength={30} />

			<TextArea
				id="content.description"
				label={copy.description}
				description={copy.descriptionDescription}
				maxLength={150} />

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
					description='אם בחרת בציטוט למשפט המפתח, ניתן לציין את שם המצוטט'
					required={false}
					maxLength={20} />
			</div>

			<RichEditor
				id="content.about"
				label={copy.about}
				maxLength={1500} />

		</Details>

		<Details title='עיצוב'>
			<Select
				id="mainColor"
				label={copy.mainColor}
				oneOf={availableColors} />

			<ImageInput
				id="content.featuredImage"
				label={copy.mainImage}
				description={copy.mainImageDescription}
				sizes={[450, 800, 1024, 1400]}
				isFavicon={true} />
		</Details>

		<Details title='קישורים'>

			<UrlInput isSmall
				id={'content.links.facebook'}
				label={copy.facebook}
				required={false}
				includes='facebook.com' />

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

			<TelInput isSmall
				id={'content.links.whatsapp'}
				label={copy.whatsapp}
				required={false} />

			<TelInput isSmall
				id={'content.links.phone'}
				label={copy.phone}
				required={false} />

			<EmailInput isSmall
				id={'content.links.email'}
				required={false}
				label={copy.email} />

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
				minLength="1" maxLength="6"
				emptyItem={(data) => ({
					label: 'כותרת השירות החדש',
					color: data.mainColor,
					content: 'תיאור השירות החדש',
					ctaText: 'להזמנה'
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
						label="טקסט על הכפתור שלצד התיאור"
						description="ביחרו צמד מילים שמביע את האופן שבו ניתן להנות מהשירות"
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
}