import { Fragment } from "react";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";

import Buttons from "./Buttons";

import { addButton } from "@pages/Editor/index.module.sass";

import { ArrayOrderControlContext } from ".";

export default function Repeater({ items, arrayId, singleName, wrapperHandlesTitle, addItem, cantAdd, addButtonOnTop, wrapper: Wrapper, children }) {

	const t = useFieldLabels();

	const addButtonClassName = classNames(addButton, 'button is-fullwidth has-text-weight-bold',
		addButtonOnTop && items.length ? 'mb-3' : '',
		!addButtonOnTop && items.length ? 'mt-3' : ''
	);

	return <>
		{addButtonOnTop && <button type="button block" onClick={addItem} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>}
		{items.map(({ uniqueId, formId, title, previewPath, arrayOrder }) => {
			console.log(formId, uniqueId);

			return <Fragment key={uniqueId}>
				<ArrayOrderControlContext.Provider value={arrayOrder}>
					<Wrapper {...{ title, arrayId, previewPath }} itemId={formId} key={uniqueId}>
						{!wrapperHandlesTitle && <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
							<h3 className="is-size-5 m-0 has-text-wrap-ellipsis">{title}</h3>
							<Buttons />
						</div>}
						{children(formId)}
					</Wrapper>
				</ArrayOrderControlContext.Provider>
			</Fragment>;
		})}
		{!addButtonOnTop && <button type="button block" onClick={addItem} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>}
	</>;
}