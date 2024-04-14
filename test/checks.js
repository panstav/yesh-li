import render from "@test/render";

export function canRenderChildren (Component) {

	const Child = () => <div>child</div>;

	render(() => <Component>
		<Child />
	</Component>).findByType(Child);
}