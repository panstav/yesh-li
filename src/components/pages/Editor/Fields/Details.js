import { details, innerContainer } from "@pages/Editor/index.module.sass";

export default function Detail({ title, children }) {
	return <details className={details}>
		<summary>{title}</summary>
		<div className={innerContainer}>
			{children}
		</div>
	</details>;
}