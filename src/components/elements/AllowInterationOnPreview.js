export default function AllowInteractionOnPreview({ component: Component, ...props }) {

	// if we're under Preview and the component is an anchor, we want it to hide everything on click
	const hideIfAnchor = Component === 'a' ? { 'data-hide-all-onclick': true } : {};

	return <Component {...props} data-allow-events {...hideIfAnchor} />;
}