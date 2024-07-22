import { LinkedDetails } from "@pages/Editor";

import { Hero } from "./shared";

export default function Homepage() {
	return <LinkedDetails title="Homepage" href="/">

		<Hero
			withCta
			withDarkBackgroundCheckbox
			id="content.pages.home" />

	</LinkedDetails>;
}