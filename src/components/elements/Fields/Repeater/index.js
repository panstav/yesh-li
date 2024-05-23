import { createContext, useContext } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { useFieldLabels } from "@hooks/use-i18n";

import Component from "./Repeater";
import { CollapsedRepeaterItem, ModalizedRepeaterItem, NoWrapper } from "./wrappers";
import RenderChildren from "@wrappers/RenderChildren";

import { EditorContext, tempIds } from "@pages/Editor";

export const ArrayOrderControlContext = createContext();

export default function Repeater({ arrayId, singleName, emptyItem, collapseItems, openItemInModal, onRemove, addButtonOnTop, pathKey, minLength, maxLength, wrapper: ItemWrapper, children }) {

	validate();

	let ComponentWrapper;
	if (!ItemWrapper) {
		if (!collapseItems) ItemWrapper = NoWrapper;

		if (openItemInModal) {
			ItemWrapper = ModalizedRepeaterItem;
			ComponentWrapper = 'div';
		} else {
			ItemWrapper = CollapsedRepeaterItem;
			// ignore any props passed to the Repeater component template wrapper
			ComponentWrapper = RenderChildren;
		}
	}

	const t = useFieldLabels();
	const { currentPath } = useContext(EditorContext);
	const { getValues } = useFormContext();
	const { append, remove, move } = useFieldArray({ name: arrayId });

	const arrayData = getValues(arrayId);

	const addItem = () => {
		const newItem = typeof emptyItem === 'function' ? emptyItem(getValues()) : emptyItem;
		tempIds.set(emptyItem);
		return append(newItem);
	};

	const removeItem = (itemIndex) => {
		const item = arrayData[itemIndex];
		onRemove?.(item);
		remove(itemIndex);
	};

	const cantRemove = (minLength && arrayData.length == minLength) ? t.minItemsRepeater(minLength) : '';
	const cantAdd = maxLength && arrayData.length == maxLength ? t.maxItemsRepeater(maxLength) : '';

	const props = {
		items: arrayData.map(extendField),
		arrayId,
		singleName,
		wrapperHandlesTitle: !!collapseItems,
		addItem,
		cantAdd,
		addButtonOnTop,
		wrapper: ItemWrapper,
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
			title,
			arrayOrder,
			uniqueId: item._id,
			itemId: `${arrayId}.${index}`
		};

		if (pathKey) {
			props.previewPath = typeof pathKey === 'function' ? pathKey(props.itemId) : item[pathKey];
			props.arrayOrder.isPreviewing = props.previewPath === currentPath;
		}

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