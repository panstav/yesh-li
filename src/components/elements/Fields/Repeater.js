import { Fragment, createContext, useContext } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import useI18n, { useFieldLabels } from "@hooks/use-i18n";

import Details from "@elements/Details";
import Modal, { SaveButton, useModal } from "@wrappers/Modal";
import { ArrowDown, ArrowUp, Close } from "@elements/Icon";

import { fieldsContainer, compoundField, addButton, repeaterItemTitle } from "@pages/Editor/index.module.sass";

const ArrayOrderControlContext = createContext();

export default function Repeater({ arrayId, singleName, emptyItem, collapseItems, openItemInModal, addButtonOnTop, minLength, maxLength, wrapper: Wrapper, children }) {

	if (!arrayId) throw new Error('Repeater: arrayId is required');
	if (!singleName) throw new Error(`Repeater (${arrayId}): singleName is required`);
	if (!emptyItem) throw new Error(`Repeater (${arrayId}): emptyItem is required`);
	if (collapseItems && !emptyItem[collapseItems]) throw new Error(`Repeater (${arrayId}): emptyItem must have a non-falsy property named ${collapseItems}`);
	if (!children || typeof children !== 'function') throw new Error(`Repeater: children is required and must (${arrayId}) be a function`);

	if (!Wrapper) Wrapper = collapseItems
		? openItemInModal ? ModalizedRepeaterItem : CollapsedRepeaterItem
		: NoWrapper;

	const t = useFieldLabels();
	const { getValues } = useFormContext();
	const { fields, append, remove, move } = useFieldArray({ name: arrayId });

	const addToBottom = () => {
		if (typeof emptyItem !== 'function') return append(emptyItem);
		return append(emptyItem(getValues()));
	};

	const cantRemove = (minLength && fields.length == minLength) ? t.minItemsRepeater(minLength) : '';
	const cantAdd = maxLength && fields.length == maxLength ? t.maxItemsRepeater(maxLength) : '';

	const addButtonClassName = classNames(addButton, 'button is-fullwidth has-text-weight-bold',
		addButtonOnTop && fields.length ? 'mb-3' : '',
		!addButtonOnTop && fields.length ? 'mt-3' : ''
	);

	return <>
		{addButtonOnTop && <button type="button block" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>}
		{fields.map((field, index) => {

			const arrayOrderControl = { move, cantRemove, remove, itemIndex: index, lastIndex: fields.length - 1 };

			const itemId = `${arrayId}.[${index}]`;
			let itemTitle = `${singleName} #${index + 1}`;
			// prefer fieldTitle if titleId is given and is not empty
			if (collapseItems) itemTitle = getValues(`${arrayId}.[${index}].${collapseItems}`);

			const fieldHeaderClassName = classNames('is-flex is-align-items-center ', collapseItems ? 'is-justify-content-end' : 'is-justify-content-space-between mb-4');

			return <Fragment key={field.id}>
				<ArrayOrderControlContext.Provider value={arrayOrderControl}>
					<Wrapper title={itemTitle} itemId={itemId} key={field.id}>
						{!collapseItems && <div className={fieldHeaderClassName}>
							<h3 className="is-size-5 m-0 has-text-wrap-ellipsis">{itemTitle}</h3>
							<Buttons />
						</div>}
						{children(itemId)}
					</Wrapper>
				</ArrayOrderControlContext.Provider>
			</Fragment>;
		})}
		{!addButtonOnTop && <button type="button block" onClick={addToBottom} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>}
	</>;

}

function Buttons({ onlyOnHover, style }) {
	const t = useFieldLabels();
	const { move, cantRemove, remove, itemIndex, lastIndex } = useContext(ArrayOrderControlContext);

	const repeatedButtonClassName = classNames('button is-small has-text-weight-bold', !onlyOnHover && 'is-block');
	const buttonStyle = { height: 'auto', ...style };

	const handle = (fn) => (event) => {
		event.stopPropagation();
		fn();
	};

	return <div className="buttons has-addons is-flex-shrink-0 ps-4">

		{itemIndex !== 0 && <button
			type="button" className={repeatedButtonClassName}
			onClick={handle(() => move(itemIndex, itemIndex - 1))}
			title={t.move_up} data-index={itemIndex}
			style={buttonStyle}
		>
			<ArrowUp style={{ width: '0.75rem' }} />
		</button>}

		{itemIndex !== lastIndex && <button
			type="button" className={repeatedButtonClassName}
			onClick={handle(() => move(itemIndex, itemIndex + 1))}
			title={t.move_down}
			style={buttonStyle}
		>
			<ArrowDown style={{ width: '0.75rem' }} />
		</button>}

		<button
			type="button" className={repeatedButtonClassName}
			disabled={!!cantRemove} onClick={handle(() => remove(itemIndex))}
			title={cantRemove || t.remove} data-index={itemIndex}
			style={buttonStyle}
		>
			<Close />
		</button>

	</div>;
}

function ModalizedRepeaterItem({ title, children }) {
	const [{ misc: t }] = useI18n();

	const [repeaterItemModal, showModal] = useModal({ blurBackground: true });

	const titleWrapperClassName = classNames(repeaterItemTitle, 'is-clickable');

	return <>
		<TitleWithButtons
			title={title}
			onClick={() => showModal()}
			className={titleWrapperClassName} />

		<Modal {...repeaterItemModal} noCloseButton render={() => <div className={fieldsContainer}>
			{children}
			<SaveButton>{t.continue}</SaveButton>
		</div>} />
	</>;
}

function CollapsedRepeaterItem({ title, children, ...props }) {
	const Title = () => <TitleWithButtons title={title} titleProps={{ ['data-avoid-closing-details']: true }} />;
	return <Details title={Title} {...props}>
		{children}
	</Details>;
}

function TitleWithButtons({ title, className: classes, onClick, titleProps }) {
	const className = classNames("is-flex is-justify-content-space-between is-align-items-center pe-5", classes);
	return <div className={className} onClick={onClick}>
		<h3 className="is-size-5 m-0 has-text-wrap-ellipsis" {...titleProps}>{title}</h3>
		<Buttons onlyOnHover />
	</div>;
}

function NoWrapper ({ children }) {
	return <div className={compoundField}>
		{children}
	</div>;
}