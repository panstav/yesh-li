import Section from "@wrappers/Section";

import SafeHeader from "@pages/Editor/Header/SafeHeader";

export default function ContentPage({ children }) {
	return <>
		<SafeHeader />
		<Section>
			<div className="box content mb-6">
				{children}
			</div>
		</Section>
	</>;
}