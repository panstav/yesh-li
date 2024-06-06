import { useContext } from "react";

import Section from "@wrappers/Section";

import { PageContext } from "./Theme";

export default function Statement() {
	const { css, content: { statement } } = useContext(PageContext);
	return <div style={{ backgroundColor: `var(--color-primary-quarter)`, borderBottom: css.border }}>
		<Section noTopMargin className="is-size-5 py-5">
			<div className="has-text-centered" dangerouslySetInnerHTML={{ __html: statement }} />
		</Section>
	</div>;
}