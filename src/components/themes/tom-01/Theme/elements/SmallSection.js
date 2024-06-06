import Section from "@wrappers/Section";

export default function SmallSection({ style, children, ...props }) {
	return <Section style={{ maxWidth: '70ch', ...style }} {...props}>
		{children}
	</Section>;
}