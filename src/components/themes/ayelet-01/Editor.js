import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { ImageInput, Select, TextInput, Repeater, TextArea, RichEditor } from "@elements/Fields";
import Details from "@elements/Details";
import { NumberInput } from "@elements/Fields/TextInput";

export default function Ayelet_01() {
	const { setValue, getValues } = useFormContext();

	useEffect(updateTitle, []);

	return <>

		<Details title='כללי'>

			<TextInput
				id="content.titleRow1"
				label="כותרת ראשונה"
				maxLength={30}
				onChange={updateTitle} />

			<TextInput
				id="content.titleRow2"
				label="כותרת שנייה"
				maxLength={40}
				onChange={updateTitle} />

			<RichEditor
				id="content.topDescription"
				label="תיאור עליון"
				maxLength={2000}
				withLink />

			<RichEditor
				id="content.workshopDetails"
				label="פרטים נוספים"
				maxLength={2000}
				withLink />

		</Details>

		<Details title='הרשמה'>

			<Select
				id="content.isSoldOut"
				label={'סטטוס'}
				oneOf={[
					{ label: 'הרשמה פתוחה', value: 'false' },
					{ label: 'הרשמה סגורה', value: 'true' }
				]} />

			<TextInput
				id="content.lastDayToRegister"
				label="תאריך אחרון להרשמה" />

			<NumberInput
				id="content.retreatPrice"
				label="מחיר הסדנה"
				description="לא כולל אירוח" />

			<NumberInput
				id="content.registrationPrice"
				label="דמי הרשמה" />
		</Details>

		<Details title='חדרים'>
			<Repeater
				arrayId="content.roomTypes"
				singleName="חדר"
				minLength="1"
				emptyItem={{
					name: '',
					persons: 1,
					totalPrice: 1000
				}}>
				{(id) => <>
					<TextInput
						id={`${id}.name`}
						label="שם"
						maxLength={30} />
					<NumberInput
						id={`${id}.persons`}
						label="מספר האנשים בחדר" />
					<NumberInput
						id={`${id}.totalPrice`}
						label="מחיר"
						description="לא כולל מחיר הסדנה" />
				</>}
			</Repeater>
		</Details>

		<Details title='מדיה'>
			<Repeater
				arrayId="content.gallery"
				singleName="תמונה"
				minLength="0" maxLength="10"
				emptyItem={{
					size: '1',
					alt: "",
					srcSet: "https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg"
				}}>
				{(id) => <>
					<div className="block">
						<ImageInput
							isCompoundField={false}
							hasNoFocus
							id={id} />
					</div>
					<Select
						id={`${id}.size`}
						label="גודל"
						oneOf={[
							{ label: 'קטן', value: '1' },
							{ label: 'בינוני', value: '2' }
						]} />
				</>}
			</Repeater>
		</Details>

		<Details title='צוות'>
			<Repeater
				arrayId="content.guides"
				singleName="מדריך\ה"
				minLength="1"
				emptyItem={{
					name: '',
					description: '',
					image: {
						alt: '',
						srcSet: 'https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg'
					}
				}}>
				{(id) => <>
					<TextInput
						id={`${id}.name`}
						label="שם"
						maxLength={30} />
					<TextArea
						id={`${id}.description`}
						label="תיאור"
						maxLength={250} />
					<ImageInput
						id={`${id}.image`}
						sizes={[200]} />
				</>}
			</Repeater>
		</Details>

	</>;

	function updateTitle() {
		const part1 = getValues('content.titleRow1');
		const part2 = getValues('content.titleRow2');
		const newTitle = `${part1} ${part2}`;
		if (newTitle !== getValues('title')) setValue('title', newTitle);
	}

}