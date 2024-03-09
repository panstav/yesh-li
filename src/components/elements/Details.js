import classNames from "classnames";

import { details, innerContainer } from "@pages/Editor/index.module.sass";

export default function Details ({ title, children }) {
	const detailsClassName = classNames(details, "details");
	return <details className={detailsClassName}>
		<summary>{title}</summary>
		<div className={innerContainer}>
			{children}
		</div>
	</details>;
}