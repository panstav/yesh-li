import { createContext } from "react";
import { useFormContext } from "react-hook-form";

import slugify from "@lib/slugify";

import Homepage from "./Homepage";
import Destinations from "./Destinations";

export const DomainControlContext = createContext();

export default function Admin() {
	const { setValue, getValues, getFieldState } = useFormContext();
	console.log(getValues());

	const ctx = {
		updateSlug
	};

	return <DomainControlContext.Provider value={ctx}>
		<Homepage />
		<Destinations />
	</DomainControlContext.Provider>;

	function updateSlug(slugId, titleOrId, { force } = {}) {
		if (!force && getFieldState(slugId)?.isTouched) return;
		const title = getValues(titleOrId) || titleOrId;
		setValue(slugId, slugify(title), { shouldValidate: true, shouldDirty: true });
	}

}