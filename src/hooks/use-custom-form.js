import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function useCustomForm({ autoFocus = true, defaultValues = {}, shouldUseNativeValidation = true } = {}) {

	const ref = useRef(null);

	const form = useForm({
		defaultValues,
		shouldUseNativeValidation
	});

	const isClean = () => !Object.values(form.formState.dirtyFields).length;

	useEffect(() => {
		// 3 conditions to autofocus: 1) autoFocus is true 2) ref is set 3) ref is not inside of an iframe
		if (autoFocus && ref.current && ref.current.ownerDocument === document) {
			const inputElem = ref.current.querySelector('input, textarea');
			if (inputElem) inputElem.focus();
		}
	}, [ref]);

	return { ref, form, isClean };

}