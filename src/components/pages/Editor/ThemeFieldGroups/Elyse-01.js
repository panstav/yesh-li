import { useFormContext } from "react-hook-form";

import { Details, ImageInput, Select, TextInput, Repeater, RichEditor, UrlInput, TextArea, TelInput, EmailInput } from "@pages/Editor/Fields";
import copy from '@pages/Editor/copy';

export default function Elyse_01 () {
	const { setValue, getValues } = useFormContext();
	updateTitle();

	return <>
		<Details title='אודות'>
			<TextInput
				id="content.fullName"
				label={copy.fullName}
				maxLength={20}
				onChange={updateTitle} />

			<TextInput
				id="content.occupation"
				label={copy.occupation}
				description={copy.occupationDescription}
				maxLength={30}
				onChange={updateTitle} />

			<TextArea
				id="content.description"
				label={copy.description}
				description={copy.descriptionDescription}
				maxLength={150} />

			<TextArea
				id="content.statement"
				label={copy.statement}
				description={copy.statementDescription}
				required={false}
				maxLength={200} />
		</Details>

		<Details title='עיצוב'>
			<Select
				id="mainColor"
				label={copy.mainColor}
				oneOf={[
					{ label: 'כחול', value: 'blue' },
					{ label: 'ירוק', value: 'green' },
					{ label: 'צהוב', value: 'yellow' },
					{ label: 'אדום', value: 'red' },
					{ label: 'סגול', value: 'purple' }
				]} />

			<ImageInput
				id="content.portrait"
				label={copy.mainImage}
				description={copy.mainImageDescription}
				sizes={[450, 800]} />
		</Details>

		<Details title='שירותים'>
			<Repeater
				arrayId="content.sections"
				singleName="שירות"
				minLength="3" maxLength="6"
				emptyItem={(data) => ({
					label: 'כותרת השירות החדש',
					color: data.mainColor,
					content: 'תיאור השירות החדש',
					ctaText: 'להזמנה',
					image: {
						// https://placehold.jp/d9d9d9/ffffff/250x250.jpg?text=תמונה זמנית
						srcSet: 'https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg',
						alt: ''
					}
				})}>{(id) => <>

					<Select
						id={`${id}.color`}
						label="צבע"
						oneOf={[
							{ label: 'כחול', value: 'blue' },
							{ label: 'ירוק', value: 'green' },
							{ label: 'צהוב', value: 'yellow' },
							{ label: 'אדום', value: 'red' },
							{ label: 'סגול', value: 'purple' }
						]} />

					<TextInput
						id={`${id}.label`}
						label="כותרת"
						maxLength={30} />

					<ImageInput
						id={`${id}.image`}
						label="תמונה לצד השירות"
						sizes={[450]} />

					<RichEditor
						id={`${id}.content`}
						label='תיאור' />

					<TextInput
						id={`${id}.ctaText`}
						label="טקסט על הכפתור שלצד התיאור"
						description="ביחרו צמד מילים שמביע את האופן שבו ניתן להנות מהשירות"
						maxLength={15} />

				</>}
			</Repeater>
		</Details>

		<Details title='טופס הפניות'>
			<TextInput
				id="content.ctaHeader"
				label="כותרת מעל טופס הפניות"
				maxLength={50} />

			<TextInput
				id="content.submitText"
				label="טקסט על כפתור שליחת הטופס"
				description="המילים שיופיעו על גבי כפתור שבלחיצה עליו נשלח טופס הפניות"
				maxLength={15} />
		</Details>

		<Details title='קישורים'>

			<UrlInput isSmall
				id={'content.socials.facebook'}
				label="פייסבוק"
				required={false}
				includes='facebook.com' />

			<UrlInput isSmall
				id={'content.socials.instagram'}
				label="אינסטגרם"
				required={false}
				includes='instagram.com' />

			<UrlInput isSmall
				id={'content.socials.linkedin'}
				label="לינקדאין"
				required={false}
				includes='linkedin.com' />

			<UrlInput isSmall
				id={'content.socials.twitter'}
				label="טוויטר"
				required={false}
				includes='twitter.com' />

			<UrlInput isSmall
				id={'content.socials.pinterest'}
				label="פינטרסט"
				required={false}
				includes='pinterest.com' />

			<UrlInput isSmall
				id={'content.socials.youtube'}
				label="יוטיוב"
				required={false}
				includes='youtube.com' />

			<UrlInput isSmall
				id={'content.socials.tiktok'}
				label="טיקטוק"
				required={false}
				includes='tiktok.com' />

			<TelInput isSmall
				id={'content.socials.whatsapp'}
				label="וואטסאפ"
				required={false} />

			<TelInput isSmall
				id={'content.socials.phone'}
				label="טלפון"
				required={false} />

			<EmailInput isSmall
				id={'content.socials.email'}
				label={copy.email}
				required={false} />

		</Details>
	</>;

	function updateTitle() {
		const fullName = getValues('content.fullName');
		const occupation = getValues('content.occupation');
		setValue('title', `${occupation} • ${fullName}`);
	}

}