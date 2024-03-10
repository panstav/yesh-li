import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import { compoundField, repeatedButton, addButton } from "@pages/Editor/index.module.sass";
import { ArrowDown, ArrowUp, Close } from "@elements/Icon";

export default function Repeater({ arrayId, singleName, emptyItem, minLength, maxLength, children }) {

	const { getValues } = useFormContext();
	const { fields, append, remove, move } = useFieldArray({ name: arrayId });

	const addToBottom = () => {
		if (typeof emptyItem !== 'function') return append(emptyItem);
		return append(emptyItem(getValues()));
	};

	const cantRemove = (minLength && fields.length == minLength) ? `מינימום ${minLength} פריטים` : '';
	const cantAdd = maxLength && fields.length == maxLength ? `מקסימום ${maxLength} פריטים` : '';

	const repeatedButtonClassName = classNames(repeatedButton, 'button is-small has-text-weight-bold');
	const addButtonClassName = classNames(addButton, 'button is-fullwidth has-text-weight-bold');

	return <>
		{fields.map((field, index) => {

			return <div className={compoundField} key={field.id}>

				<div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
					<h3 className="is-size-5 m-0">{singleName} #{index + 1}</h3>
					<div className="buttons has-addons">

						{index !== 0 && <button
							type="button" className={repeatedButtonClassName}
							onClick={() => move(index, index - 1)}
							title="לדחוף מעלה" data-index={index}
						>
							<ArrowUp style={{ width: '0.75rem' }} />
						</button>}

						{index !== fields.length - 1 && <button
							type="button" className={repeatedButtonClassName}
							onClick={() => move(index, index + 1)}
							title="לדחוף מטה"
						>
							<ArrowDown style={{ width: '0.75rem' }} />
						</button>}
						<button
							type="button" className={repeatedButtonClassName}
							disabled={!!cantRemove} onClick={() => remove(index)}
							title={cantRemove || 'להסיר'} data-index={index}
						>
							<Close />
						</button>
					</div>
				</div>

				{children(`${arrayId}.[${index}]`)}
			</div>;
		})}
		<button type="button" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>להוסיף {singleName}</button>
	</>;

}
