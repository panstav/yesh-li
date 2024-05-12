import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useFieldLabels } from '@hooks/use-i18n';

import Modal, { useErrorModal, useModal } from '@wrappers/Modal';

import xhr from '@services/xhr';

import FocusModal from './FocusModal';
import Component from './ImageInput';
import limitImageSize from './limit-image-size';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function ImageInput({ id, label, description, sizes, multiple = false, hasNoFocus, hasNoAlt, isCompoundField = !hasNoAlt, onChange, required = true }) {
	
	const t = useFieldLabels();

	const { setValue, getValues, getFieldState, formState } = useFormContext();

	const [supportedFileTyesModal, showSupportedFileTyesModal] = useErrorModal();
	const [moderationModal, showModerationModal] = useErrorModal();
	const [fileTypeMisname, showFileTypeMisnameModal] = useErrorModal();
	const [serverErrorModal, showServerErrorModal] = useErrorModal();

	const imgId = `${id}.srcSet`;
	const state = getFieldState(imgId, formState);

	const imgProps = getValues(id) || {};
	const [focusModal, openFocusModal] = useModal({
		imageToFocus: imgProps,
		onSubmit: ({ position }) => {
			if (position !== getValues(`${id}.position`)) onChange?.(imgProps);
			return setValue(`${id}.position`, position);
		}
	});
	const setFocus = () => openFocusModal();

	const [fileName, setFileName] = useState();
	const [isLoading, setLoading] = useState(false);

	const acceptedFileSuffixes = allowedTypes.join(',').replaceAll('image/', '.');
	const acceptedExtnames = allowedTypes.join(', ').replaceAll('image/', '.');

	const props = {
		id,
		error: state?.error?.message,
		label,
		description,
		imgId,
		imgProps,
		fileName,
		multiple,
		acceptedFileSuffixes,
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

		<Modal {...supportedFileTyesModal} render={() => `${t.image_types_supported}: ${acceptedExtnames}`} />
		<Modal {...moderationModal} render={t.ModerationInvalidatedModal} />
		<Modal {...fileTypeMisname} render={t.ExtensionMatchesFileDoesNot} allowedTypes={acceptedExtnames} />
		<Modal {...serverErrorModal} render={() => t.image_upload_error} />

		<Modal {...focusModal} render={FocusModal} />
	</>;

	async function onFileChange(event) {
		const file = event.currentTarget.files[0];

		if (!file) return;
		if (!allowedTypes.includes(file.type)) return showSupportedFileTyesModal();

		// we're done with validation, let's upload the image
		setLoading(true);

		const { base64: imageBase64, width, height } = await limitImageSize(file, 1200);

		if (!sizes) sizes = [Math.max(width, height)];

		const siteSlug = getValues('slug');
		xhr.processImage({ imageBase64, fileName: file.name, sizes, siteSlug }).then(({ srcSet }) => {
			setLoading(false);
			onChange?.(imgProps);
			setFileName(file.name);
			setValue(imgId, srcSet);
		}).catch((err) => {
			setLoading(false);
			if (err.responseData?.reasoning === 'moderation') return showModerationModal();
			if (err.responseData?.reasoning === 'type-not-allowed') return showFileTypeMisnameModal();
			showServerErrorModal();
		});
	}

}