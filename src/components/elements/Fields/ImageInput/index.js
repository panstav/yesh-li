import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Modal, { useModal } from '@wrappers/Modal';

import FocusModal from './FocusModal';
import Component from './ImageInput';

import { EditorContext, allowedImageTypes } from '@pages/Editor';

export default function ImageInput({ id, label, description, sizes, multiple = false, hasNoFocus, hasNoAlt, isCompoundField = !hasNoAlt, onChange, favicon, required = true }) {

	const { setValue, getValues, getFieldState, formState } = useFormContext();

	const { uploadImage, modals } = useContext(EditorContext);

	const imgId = `${id}.srcSet`;
	const state = getFieldState(imgId, formState);

	const imgProps = getValues(id) || {};
	const [focusModal, openFocusModal] = useModal({
		imageToFocus: imgProps,
		onSubmit: ({ position }) => {
			if (position !== getValues(`${id}.position`)) {
				onChange?.(imgProps);
				if (favicon) setValue('favicon', imgProps);
			}
			return setValue(`${id}.position`, position);
		}
	});
	const setFocus = () => openFocusModal();

	const [fileName, setFileName] = useState();
	const [isLoading, setLoading] = useState(false);

	const props = {
		id,
		error: state?.error?.message,
		label,
		description,
		imgId,
		imgProps,
		fileName,
		multiple,
		onChange: onFileChange,
		isLoading,
		isCompoundField,
		hasNoAlt,
		hasNoFocus,
		setFocus,
		required
	};

	return <>
		<Component {...props} />
		<Modal {...focusModal} render={FocusModal} />
	</>;

	async function onFileChange(event) {
		const file = event.currentTarget.files[0];

		if (!file) return;
		if (!allowedImageTypes.includes(file.type)) return modals.showSupportedFileTyes();

		// we're done with validation, let's upload the image
		setLoading(true);

		uploadImage({ file, limit: 1200, sizes, slug: getValues('slug') })
			.then(({ srcSet }) => {
				onChange?.(imgProps);
				setFileName(file.name);
				setValue(imgId, srcSet);
			})
			.finally(() => setLoading(false));
	}

}