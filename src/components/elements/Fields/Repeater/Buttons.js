import { useContext } from "react";
import classNames from "classnames";

import { useFieldLabels } from "@hooks/use-i18n";

import { ArrowDown, ArrowUp, Close, Eye } from "@elements/Icon";

import { EditorContext } from "@pages/Editor";

import { ArrayOrderControlContext } from ".";

export default function Buttons({ onlyOnHover, withGoTo, style }) {
	const t = useFieldLabels();
	const { navigate } = useContext(EditorContext);
	const { move, cantRemove, remove, itemIndex, lastIndex } = useContext(ArrayOrderControlContext);

	const repeatedButtonClassName = classNames('button is-small has-text-weight-bold', !onlyOnHover && 'is-flex');
	const buttonStyle = { height: 'auto', ...style };

	const handle = (fn) => (event) => {
		event.stopPropagation();
		fn();
	};

	return <div className="buttons has-addons is-flex-shrink-0 ps-4">

		{withGoTo && <button
			type="button" className={repeatedButtonClassName}
			onClick={handle(() => navigate(withGoTo))}
			title={t.go_to_page} data-index={itemIndex}
			style={buttonStyle}
		>
			<Eye style={{ width: '0.75rem' }} />
		</button>}

		{move && itemIndex !== 0 && <button
			type="button" className={repeatedButtonClassName}
			onClick={handle(() => move(itemIndex, itemIndex - 1))}
			title={t.move_up} data-index={itemIndex}
			style={buttonStyle}
		>
			<ArrowUp style={{ width: '0.75rem' }} />
		</button>}

		{move && itemIndex !== lastIndex && <button
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