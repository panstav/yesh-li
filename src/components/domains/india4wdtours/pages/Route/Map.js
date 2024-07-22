import { useContext } from "react";

import RouteContext from "./context";
import FlexImage from "@elements/FlexImage";

export default function Map() {
	const { map } = useContext(RouteContext);
	return <div className="box is-paddingless">
		<div className="p-3">
			<FlexImage {...map} />
		</div>
	</div>;
}