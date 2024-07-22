import { useContext } from "react";

import SectionTitle from "@domains/india4wdtours/elements/SectionTitle";
import RoutesList from "@domains/india4wdtours/elements/Routes";

import calcRating from "@domains/india4wdtours/lib/calc-rating";

import DestinationContext from "./context";

export default function Routes() {
	const { title: currentDestinationTitle, slug, routes } = useContext(DestinationContext);

	if (!routes?.length) return null;

	const sortedRoutes = routes.sort((a, b) => calcRating(b.reviews) - calcRating(a.reviews));

	return <>
		<SectionTitle aside={[{ href: `/routes/${slug}`, children: 'Show all' }]}>Featured routes</SectionTitle>
		<RoutesList {...{ currentDestinationTitle }}>
			{sortedRoutes}
		</RoutesList>
	</>;
}