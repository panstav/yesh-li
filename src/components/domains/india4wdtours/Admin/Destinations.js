import { useFormContext } from "react-hook-form";

import { LinkedDetails } from "@pages/Editor";
import { Repeater } from "@elements/Fields";

import { Hero } from "./shared";

export default function Destinations() {
	const { getValues, getFieldState } = useFormContext();

	return <LinkedDetails title="Destinations" href="/destinations">

		<Repeater
			addButtonOnTop
			arrayId="content.collectionPages.destination"
			singleName="Destination"
			collapseItems="title"
			pathKey={(id) => {
				const slugId = `${id}.slug`;
				return getFieldState(slugId).isDirty ? null : `/destination/${getValues(slugId)}`;
			}}
			emptyItem={{
				title: "New destination"
			}}>
			{(id) => <Hero
				withSlug
				id={id} />}
		</Repeater>

	</LinkedDetails>;
}