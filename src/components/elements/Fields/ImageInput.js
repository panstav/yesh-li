import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FocusPicker } from 'image-focus';
import classNames from 'classnames';

import { useFieldLabels } from '@hooks/use-i18n';

import Modal, { Title, useErrorModal, useModal } from '@wrappers/Modal';
import { Upload } from '@elements/Icon';
import Loader from '@elements/Loader';

import xhr from '@services/xhr';
import cleanUGT from '@lib/clean-user-generated-text';

import { compoundField, imagePreviewContainer } from '@pages/Editor/index.module.sass';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function ImageInput({ id, label, description, sizes, multiple = false, hasNoFocus, hasNoAlt, isCompoundField = !hasNoAlt, onChange, required = true }) {

	const t = useFieldLabels();

	const { register, setValue, getValues, getFieldState, formState } = useFormContext();

	const [supportedFileTyesModal, showSupportedFileTyesModal] = useErrorModal();
	const [moderationModal, showModerationModal] = useErrorModal();
	const [fileTypeMisname, showFileTypeMisnameModal] = useErrorModal();
	const [serverErrorModal, showServerErrorModal] = useErrorModal();

	const propertyKey = `${id}.srcSet`;
	const state = getFieldState(propertyKey, formState);

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

	const onFileChange = async (event) => {
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
			setValue(propertyKey, srcSet);
		}).catch((err) => {
			setLoading(false);
			if (err.responseData?.reasoning === 'moderation') return showModerationModal();
			if (err.responseData?.reasoning === 'type-not-allowed') return showFileTypeMisnameModal();
			showServerErrorModal();
		});
	};

	const acceptedFileSuffixes = allowedTypes.join(',').replaceAll('image/', '.');
	const acceptedExtnames = allowedTypes.join(', ').replaceAll('image/', '.');

	const compoundFieldClassName = classNames(isCompoundField && compoundField, 'is-relative field');
	const imagePreviewContainerClassName = classNames(imagePreviewContainer, 'is-relative');
	const setFocusButtonStyle = { top: isCompoundField ? '0.35rem' : '-0.35rem', insetInlineEnd: isCompoundField ? '0.5rem' : 0 };
	const uploadButtonStyle = { backgroundColor: imgProps.srcSet ? 'transparent' : 'white', visibility: isLoading ? 'hidden' : 'visible' };

	return <>

		<div className={compoundFieldClassName}>
			<div className="field file is-large is-boxed has-name is-flex-direction-column">
				<label className="file-label w-100">
					{label && <span className='label'>{label}:</span>}
					<input type="file" id={id} name={id} onChange={onFileChange} multiple={multiple} accept={acceptedFileSuffixes} className='file-input' />
					<input type="text" className="is-hidden" {...register(propertyKey, { required: required && t.required_field })} />
					<div className={imagePreviewContainerClassName}>
						{imgProps.srcSet && <img srcSet={imgProps.srcSet} className='is-overlay object-fit-cover' style={{ objectPosition: imgProps.position }} />}
						{isLoading && <Loader />}
						<span className="file-cta w-100" style={{ border: '1px solid lightgray', ...uploadButtonStyle }}>
							<span className="file-icon mx-0">
								<Upload />
							</span>
							<span className="file-label is-size-6">{imgProps.srcSet ? t.click_to_change_image : t.click_to_choose_image}</span>
						</span>
					</div>
					{fileName && <span className="file-name has-text-centered is-size-7" style={{ maxWidth: "100%" }}>{fileName}</span>}
				</label>
				{state?.error?.message
					? <p className='help is-danger'>{state.error.message}</p>
					: <p className='help'>{description}</p>}
			</div>
			{hasNoFocus || <button type="button" onClick={setFocus} className='button is-small' style={{ position: 'absolute', ...setFocusButtonStyle }}>{t.set_image_focus}</button>}
			{hasNoAlt || <div className='field'>
				<label htmlFor={`${id}-alt`} className='label is-small'>{t.image_alt}:</label>
				<input id={`${id}-alt`} className='input' type='text' {...register(`${id}.alt`, { setValueAs: cleanUGT })} />
				<p className='help'>{t.alt_description}</p>
			</div>}
		</div>

		<Modal {...supportedFileTyesModal} render={() => `${t.image_types_supported}: ${acceptedExtnames}`} />
		<Modal {...moderationModal} render={t.ModerationInvalidatedModal} />
		<Modal {...fileTypeMisname} render={t.ExtensionMatchesFileDoesNot} allowedTypes={acceptedExtnames} />
		<Modal {...serverErrorModal} render={() => t.image_upload_error} />

		<Modal {...focusModal} render={FocusModal} />

	</>;
}

function FocusModal({ setValue, getValues, imageToFocus, watch }) {

	const t = useFieldLabels();

	watch('position');
	const position = getValues('position') || imageToFocus.position || '50% 50%';
	const setFocus = ({ x, y }) => setValue('position', `${Math.round(((x + 1) / 2) * 1000) / 10}% ${Math.round((1 - ((y + 1) / 2)) * 1000) / 10}%`);

	const ref = useRef(null);

	useEffect(() => {
		const x = Number(position.split(' ')[0].replace('%', '')) / 100 * 2 - 1;
		const y = 1 - (Number(position.split(' ')[1].replace('%', '')) / 100 * 2);

		new FocusPicker(ref.current, {
			onChange: setFocus,
			focus: { x, y }
		});
	}, [ref]);

	return <>
		<Title>{t.set_image_focus}</Title>
		<div className='mx-auto' style={{ width: '20rem' }}>
			<img ref={ref} srcSet={imageToFocus.srcSet} />
		</div>
		<div className='is-flex is-justify-content-space-evenly is-align-items-center mt-6'>
			<div className='mx-auto has-radius' style={{ width: '6rem', height: '10rem', overflow: 'hidden', border: '0.25em solid var(--color-primary)' }}>
				<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
			</div>
			<div className='mx-auto has-radius' style={{ width: '10rem', height: '6rem', overflow: 'hidden', border: '0.25em solid var(--color-primary)' }}>
				<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
			</div>
		</div>
		<div className='is-flex is-justify-content-end'>
			<button className='button is-primary mt-5'>{t.submit}</button>
		</div>
	</>;
}

async function limitImageSize(file, maxSize, quality = 0.8) {
	// https://gist.githubusercontent.com/mvneerven/f69f84fbfa60c78d05a216b76b44c8a3/raw/7335e59032cebe24c87da1de228b7f605844f47c/resize-image.js
	return new Promise((resolve) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.src = url;
		img.onerror = function () {
			URL.revokeObjectURL(this.src);
		};

		img.onload = function () {
			if (img.width <= maxSize && img.height <= maxSize) return getBase64(file).then((base64) => resolve({ base64, width: img.width, height: img.height }));
			URL.revokeObjectURL(this.src);
			const [newWidth, newHeight] = calculateSize();
			const canvas = document.createElement("canvas");
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, newWidth, newHeight);

			const resultUrl = canvas.toDataURL(file.type, quality), result = {
				url: resultUrl,
				contentType: resultUrl.match(/^data:([^;]+);base64,/im)[1] || "",
				b64: resultUrl.replace(/^data:([^;]+);base64,/gim, "")
			};

			canvas.toBlob(
				(blob) => {
					result.size = blob.size;
					resolve({ base64: result.b64, width: newWidth, height: newHeight });
				},
				file.type,
				quality
			);
		};

		function calculateSize() {
			let w = img.width, h = img.height;
			if (w > h) {
				if (w > maxSize) {
					h = Math.round((h * maxSize) / w);
					w = maxSize;
				}
			} else {
				if (h > maxSize) {
					w = Math.round((w * maxSize) / h);
					h = maxSize;
				}
			}
			return [w, h];
		}

		function getBase64(file) {
			return new Promise((resolve, reject) => {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(/base64,(.*)/.exec(reader.result)[1]);
				reader.onerror = reject;
			});
		}

	});
}