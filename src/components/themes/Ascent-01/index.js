import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";

import Media from "./Media";
import Details from "./Details";

import { container } from "./index.module.sass";

export default function Ascent_1() {
	const { content } = useContext(PageContext);

	content.links.map(({ address }, index, arr) => {
		if (!address) delete arr[index];
	});

	const containerClassName = classNames(container, "is-flex-tablet is-flex-direction-row-reverse");

	const cssVariables = {
		'--color-primary': `var(--color-${content.mainColor})`,
		'--color-primary-half': `var(--color-${content.mainColor}-half)`,
		'--color-primary-quarter': `var(--color-${content.mainColor}-quarter)`
	};

	return <PageContext.Provider value={{ content }}>

		<div className={containerClassName} style={cssVariables}>

			<Media {...content.featuredImage} />

			<Details />

		</div>

	</PageContext.Provider>;
}