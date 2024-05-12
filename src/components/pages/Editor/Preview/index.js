import { useFormContext, useWatch } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";

import Preview from "./Preview";
import useNavigationWorkaround from "./use-navigation-workaround";

let validProps = {};

export default function PreviewWrapper() {

	const hasErrors = useEditorValidation();

	const { framePath, frameRef, renderAllowed } = useNavigationWorkaround({ theme: validProps.theme });

	if (!renderAllowed) return null;

	return <Preview key={framePath} {...validProps} {...{ frameRef, framePath, hasErrors }} />;
}

function useEditorValidation () {
	const { formState: { errors } } = useFormContext();

	const hasErrors = !!Object.keys(errors).length;

	// if we're certain that props are clean, use them in the next render of Preview
	// otherwise the use the last clean props
	const currentValues = useWatch();
	if (!hasErrors) validProps = cloneDeep(currentValues);

	return hasErrors;
}