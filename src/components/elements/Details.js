import { useState } from "react";
import classNames from "classnames";

import { details, innerContainer } from "@pages/Editor/index.module.sass";

export default function Details({ title, detailsRef, children }) {

	const [isOpen, setIsOpen] = useState(false);
	const toggleDetails = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(!isOpen);
	};

	const Title = typeof title === "function" ? title : () => <>{title}</>;

	const detailsClassName = classNames(details, "details");

	return <details ref={detailsRef} className={detailsClassName} onClick={preventDefaultEvent} {...isOpen ? { open: true } : {}}>
		<summary onClick={toggleDetails}>
			<Title />
		</summary>
		{isOpen && <div className={innerContainer}>
			{children}
		</div>}
	</details>;
}

function preventDefaultEvent(event) {
	event.preventDefault();
	event.stopPropagation();
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