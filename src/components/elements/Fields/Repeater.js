import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";

import RenderChildren from "@wrappers/RenderChildren";
import { ArrowDown, ArrowUp, Close } from "@elements/Icon";

import { compoundField, repeatedButton, addButton } from "@pages/Editor/index.module.sass";

export default function Repeater({ arrayId, singleName, titleFieldId, emptyItem, hideItemTitle, minLength, maxLength, wrapper: Wrapper = RenderChildren, children }) {

	if (!arrayId) throw new Error('Repeater: arrayId is required');
	if (!singleName) throw new Error(`Repeater (${arrayId}): singleName is required`);
	if (!emptyItem) throw new Error(`Repeater (${arrayId}): emptyItem is required`);
	if (!children || typeof children !== 'function') throw new Error(`Repeater: children is required and must (${arrayId}) be a function`);

	if (!Wrapper) Wrapper = collapseItems ? CollapsedRepeaterItem : RenderChildren;

	const t = useFieldLabels();
	const { getValues } = useFormContext();
	const { fields, append, remove, move } = useFieldArray({ name: arrayId });

	const addToBottom = () => {
		if (typeof emptyItem !== 'function') return append(emptyItem);
		return append(emptyItem(getValues()));
	};

	const cantRemove = (minLength && fields.length == minLength) ? t.minItemsRepeater(minLength) : '';
	const cantAdd = maxLength && fields.length == maxLength ? t.maxItemsRepeater(maxLength) : '';

	const repeatedButtonClassName = classNames(repeatedButton, 'button is-small has-text-weight-bold');
	const addButtonClassName = classNames(addButton, 'button is-fullwidth has-text-weight-bold');

	return <>
		{fields.map((field, index) => {

			const itemId = `${arrayId}.[${index}]`;

			let itemTitle;
			// prefer fieldTitle if titleId is given and is not empty
			if (!hideItemTitle) itemTitle = (titleFieldId ? getValues(`${arrayId}.[${index}].${titleFieldId}`) : '') || `${singleName} #${index + 1}`;

			return <Wrapper itemId={itemId} key={field.id}>
				<div className={compoundField}>

					<div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
						{hideItemTitle ? <span /> : <h3 className="is-size-5 m-0">{itemTitle}</h3>}
						<div className="buttons has-addons">

						{index !== 0 && <button
							type="button" className={repeatedButtonClassName}
							onClick={() => move(index, index - 1)}
							title={t.move_up} data-index={index}
						>
							<ArrowUp style={{ width: '0.75rem' }} />
						</button>}

						{index !== fields.length - 1 && <button
							type="button" className={repeatedButtonClassName}
							onClick={() => move(index, index + 1)}
							title={t.move_down}
						>
							<ArrowDown style={{ width: '0.75rem' }} />
						</button>}
						<button
							type="button" className={repeatedButtonClassName}
							disabled={!!cantRemove} onClick={() => remove(index)}
							title={cantRemove || t.remove} data-index={index}
						>
							<Close />
						</button>
					</div>

					{children(itemId)}
				</div>

				{children(`${arrayId}.[${index}]`)}
			</div>;
		})}
		<button type="button" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>
	</>;

}

function CollapsedRepeaterItem ({ title, children, ...props }) {
	return <Details title={title} {...props}>
		{children}
	</Details>;
}