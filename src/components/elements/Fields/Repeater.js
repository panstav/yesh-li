import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";

import Details from "@elements/Details";
import { ArrowDown, ArrowUp, Close } from "@elements/Icon";
import RenderChildren from "@wrappers/RenderChildren";

import { compoundField, repeatedButton, addButton } from "@pages/Editor/index.module.sass";

export default function Repeater({ arrayId, singleName, emptyItem, collapseItems, minLength, maxLength, wrapper: Wrapper, children }) {

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

			let itemTitle = `${singleName} #${index + 1}`;
			// prefer fieldTitle if titleId is given and is not empty
			if (collapseItems) itemTitle = getValues(`${arrayId}.[${index}].${collapseItems}`);

			const fieldHeaderClassName = classNames('is-flex is-align-items-center ', collapseItems ? 'is-justify-content-end' : 'is-justify-content-space-between mb-4');

			return <Wrapper title={itemTitle} key={field.id}>
				<div className={compoundField}>

					<div className={fieldHeaderClassName}>
						{!collapseItems && <h3 className="is-size-5 m-0">{itemTitle}</h3>}
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
					</div>

					{children(`${arrayId}.[${index}]`)}
				</div>
			</Wrapper>;
		})}
		<button type="button" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>
	</>;

}

function CollapsedRepeaterItem ({ title, children, ...props }) {
	return <Details title={title} {...props}>
		{children}
	</Details>;
}