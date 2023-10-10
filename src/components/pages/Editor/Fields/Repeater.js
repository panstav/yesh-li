import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import { compoundField, removeButton, addButton } from "@pages/Editor/index.module.sass";

export default function Repeater({ arrayId, singleName, emptyItem, minLength, maxLength, children }) {

	const { control, getValues } = useFormContext();
	const { fields, append, remove } = useFieldArray({ name: arrayId, control });

	const addToBottom = () => append(emptyItem(getValues()));

	const cantRemove = (minLength && fields.length == minLength) ? `מינימום ${minLength} פריטים` : '';
	const cantAdd = maxLength && fields.length == maxLength ? `מקסימום ${maxLength} פריטים` : '';

	const compoundFieldClassName = classNames(compoundField, 'mb-5');
	const removeButtonClassName = classNames(removeButton, 'button is-small has-text-weight-bold');
	const addButtonClassName = classNames(addButton, 'button is-fullwidth has-text-weight-bold');

	return <>
		{fields.map((field, index) => {
			return <div className={compoundFieldClassName} key={field.id}>

				<div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
					<h3 className="is-size-5 m-0">{singleName} #{index + 1}</h3>
					<button type="button" onClick={remove} data-index={index} className={removeButtonClassName} disabled={!!cantRemove} title={cantRemove}>להסיר</button>
				</div>

				{children(`${arrayId}.[${index}]`)}
			</div>;
		})}
		<button type="button" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>להוסיף {singleName}</button>
	</>;

}