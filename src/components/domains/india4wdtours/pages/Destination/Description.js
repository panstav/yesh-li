import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import RenderChildren from "@wrappers/RenderChildren";

import DestinationContext from "./context";

export default function Description({ limitHeight, className: classes }) {
	const { contentHtml } = useContext(DestinationContext);

	const descriptionDefaultHeight = 'none';
	const [maxHeight, setMaxHeight] = useState(descriptionDefaultHeight);
	const isLimited = maxHeight !== descriptionDefaultHeight;

	const ref = useRef();

	useEffect(applyLimitHeight, [limitHeight]);

	const Wrapper = isLimited ? 'div' : RenderChildren;

	const className = classNames("content mb-0", classes);

	return <Wrapper className="is-relative">
		<div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: contentHtml }} style={{ maxHeight, overflow: "hidden" }} />
		{isLimited && <>
			<div className="is-overlay" style={{ top: 'unset', bottom: '0', height: '100%', background: 'linear-gradient(180deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,1) 100%)' }} />
			<div className="is-overlay" style={{ top: 'unset', bottom: '-1em' }}>
				<button onClick={() => setMaxHeight(descriptionDefaultHeight)} className="button is-small" style={{ marginInlineStart: '1rem', insetInlineEnd: 'auto' }}>
					Read More
				</button>
			</div>
		</>}
	</Wrapper>;

	function applyLimitHeight() {

		// bail if the max height is not set, or if the ref is not set, or if maxHeight is not undefined
		if (!limitHeight || !ref.current || maxHeight !== descriptionDefaultHeight) return;

		// bail if the content is already smaller than the given max height
		if (ref.current.offsetHeight <= limitHeight) return;

		setMaxHeight(limitHeight);
	}

}