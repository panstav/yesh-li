import { createContext } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { useFieldLabels } from "@hooks/use-i18n";

import Component from "./Repeater";
import { CollapsedRepeaterItem, ModalizedRepeaterItem, NoWrapper } from "./wrappers";
import RenderChildren from "@wrappers/RenderChildren";

export const ArrayOrderControlContext = createContext();

export default function Repeater({ arrayId, singleName, emptyItem, collapseItems, openItemInModal, onRemove, addButtonOnTop, pathKey, minLength, maxLength, wrapper: Wrapper, children }) {

	validate();

	let ComponentWrapper;
	if (!Wrapper) {
		if (!collapseItems) Wrapper = NoWrapper;

		if (openItemInModal) {
			Wrapper = ModalizedRepeaterItem;
			ComponentWrapper = 'div';
		} else {
			Wrapper = CollapsedRepeaterItem;
			// ignore any props passed to the Repeater component template wrapper
			ComponentWrapper = RenderChildren;
		}
	}

	const t = useFieldLabels();
	const { getValues } = useFormContext();
	const { fields, append, remove, move } = useFieldArray({ name: arrayId });

	const addItem = () => {
		if (typeof emptyItem !== 'function') return append(emptyItem);
		return append(emptyItem(getValues()));
	};

	const removeItem = (itemIndex) => {
		const item = fields[itemIndex];
		onRemove?.(item);
		remove(itemIndex);
	};

	const cantRemove = (minLength && fields.length == minLength) ? t.minItemsRepeater(minLength) : '';
	const cantAdd = maxLength && fields.length == maxLength ? t.maxItemsRepeater(maxLength) : '';

	const items = getValues(arrayId)
		.map(extendField)
		.map((item, index) => ({ ...item, uniqueId: fields[index]?.id || item.title }));

	const props = {
		items,
		arrayId,
		singleName,
		wrapperHandlesTitle: !!collapseItems,
		addItem,
		cantAdd,
		addButtonOnTop,
		wrapper: Wrapper,
		children
	};

	return <ComponentWrapper className="block">
		<Component {...props} />
	</ComponentWrapper>;

	function extendField(item, index, items) {

		const arrayOrder = { move, remove: removeItem, cantRemove, itemIndex: index, lastIndex: items.length - 1 };

		// ,
		// add move unless we have a sorter
		// ...sortBy ? {} : { move }
		// };

		let title = `${singleName} #${index + 1}`;
		// prefer fieldTitle if titleId is given and is not empty
		if (collapseItems) title = getValues(`${arrayId}.${index}.${collapseItems}`);

		const props = {
			formId: `${arrayId}.${index}`,
			title,
			arrayOrder
		};

		if (pathKey) props.previewPath = typeof pathKey === 'function' ? pathKey(item) : item[pathKey];

		return props;

	}

	function validate () {
		if (!arrayId) throw new Error('Repeater: arrayId is required');
		if (!singleName) throw new Error(`Repeater (${arrayId}): singleName is required`);
		if (!emptyItem) throw new Error(`Repeater (${arrayId}): emptyItem is required`);
		if (collapseItems && !emptyItem[collapseItems]) throw new Error(`Repeater (${arrayId}): emptyItem must have a non-falsy property named ${collapseItems}`);
		if (!children || typeof children !== 'function') throw new Error(`Repeater: children is required and must (${arrayId}) be a function`);
	}

}