import { Link } from "gatsby";

import { Logo } from "@elements/Icon";
import Section from "@wrappers/Section";

export default function ContentPage({ children }) {
	return <>
		<div className="has-background-primary has-text-centered pt-3 pb-1">
			<Link to="/">
				<Logo className="has-text-white" style={{ width: '4rem' }} />
			</Link>
		</div>
		<Section>
			<div className="box content mb-6">
				{children}
			</div>
		</Section>
	</>;
}