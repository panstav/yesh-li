export default function AllowInteractionOnPreview({ component: Component, ...props }) {
	return <Component {...props} data-allow-events />;
}