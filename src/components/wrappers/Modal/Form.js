import { useCallback, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Modal from './Modal';

export default function Form({ onSubmit, hideable, confirmBeforeHiding, autoClose = true, hideModal: unsafeHideModal, render, title, ...modalProps }) {

	const { ref, form, isClean } = useCustomForm();

	const hideModal = useCallback(() => {
		if (!confirmBeforeHiding || isClean() || confirm('Sure?')) return unsafeHideModal();
	}, [isClean()]);

	const handleSubmit = (...args) => {
		onSubmit(...args);
		if (autoClose) unsafeHideModal();
	};

	return <FormProvider {...form}>
		<Modal {...{ title, hideModal, hideable }}>
			<form ref={ref} onSubmit={form.handleSubmit(handleSubmit)}>
				{render(Object.assign({ hideModal }, form, modalProps))}
			</form>
		</Modal>
	</FormProvider>;
}

function useCustomForm({ autoFocus = true, defaultValues = {} } = {}) {

	const ref = useRef(null);

	const form = useForm({
		defaultValues,
		shouldUseNativeValidation: true
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