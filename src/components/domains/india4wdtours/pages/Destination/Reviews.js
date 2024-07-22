import { useContext } from "react";

import SectionTitle from "@domains/india4wdtours/elements/SectionTitle";
import ReviewsList from "@domains/india4wdtours/elements/Reviews";

import DestinationContext from "./context";

import { isStackedBoxes } from "@domains/india4wdtours/index.module.sass";

export default function Reviews() {
	const { title, reviews } = useContext(DestinationContext);
	if (!reviews?.length) return null;

	return <>
		<SectionTitle aside={[{ href: `https://maps.google.com/?q=${title}`, children: 'Show all' }]}>Reviews</SectionTitle>
		<div className={isStackedBoxes}>
			<ReviewsList>{reviews}</ReviewsList>
		</div>
	</>;
}