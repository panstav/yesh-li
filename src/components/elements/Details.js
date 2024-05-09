import { useState } from "react";
import classNames from "classnames";

import { details, innerContainer } from "@pages/Editor/index.module.sass";

export default function Details({ title, detailsRef, children }) {

	const [isOpen, setIsOpen] = useState(false);
	const toggleDetails = (event) => {

		// elements in details shouldn't toggle the details onClick, unless they have the allowing attribute
		if (event.target !== event.currentTarget) {
			if (event.target.tagName === "BUTTON" || event.target.closest('button')) return;
			if ((!event.target.getAttribute("[data-avoid-closing-details]") || event.target.closest('[data-avoid-closing-details]')) && isOpen) return;
		}

		event.preventDefault();
		event.stopPropagation();
		setIsOpen(!isOpen);
	};

	const Title = typeof title === "function" ? title : () => <>{title}</>;

	const detailsClassName = classNames(details, "details");

	return <details ref={detailsRef} className={detailsClassName} {...isOpen ? { open: true } : {}}>
		<summary onClick={toggleDetails}>
			<Title />
		</summary>
		{isOpen && <div className={innerContainer}>
			{children}
		</div>}
	</details>;
}

// eslint-disable-next-line no-unused-vars
function PreviousDetails({ title, children }) {
	const Title = typeof title === "function" ? title : () => <>{title}</>;
	const detailsClassName = classNames(details, "details");
	return <details className={detailsClassName}>
		<summary>
			<Title />
		</summary>
		<div className={innerContainer}>
			{children}
		</div>
	</details>;
}