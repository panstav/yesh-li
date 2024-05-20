import { useFieldLabels } from "@hooks/use-i18n";
import { Fragment } from "react";

import Buttons from "./Buttons";

import { ArrayOrderControlContext } from ".";

export default function Repeater({ items, arrayId, singleName, wrapperHandlesTitle, addItem, cantAdd, addButtonOnTop, addButtonClassName, wrapper: Wrapper, children }) {

	const t = useFieldLabels();

	return <>
		{addButtonOnTop && <button type="button block" onClick={addItem} className={addButtonClassName} disabled={!!cantAdd} title={cantAdd}>{t.addItem(singleName)}</button>}
		{items.map(({ title, formId, expandItem, previewPath, arrayOrder }) => {
			return <Fragment key={formId}>
				<ArrayOrderControlContext.Provider value={arrayOrder}>
					<Wrapper {...{ title, arrayId, expandItem, previewPath }} itemId={formId} key={formId}>
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