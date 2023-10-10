import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FocusPicker } from 'image-focus';
import classNames from 'classnames';

import Modal, { Title, useModal } from '@wrappers/Modal';
import { Upload } from '@elements/Icon';
import xhr from '@services/xhr';
import cleanUGT from '@lib/clean-user-generated-text';

import { compoundField } from '@pages/Editor/index.module.sass';
import copy from '@pages/Editor/copy';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const acceptedTypes = allowedTypes.join(',').replaceAll('image/', '.');

export default function ImageInput({ id, label, description, sizes, required = true, multiple = false, hasNoFocus, isCompoundField = true }) {
	const { register, setValue, getValues, setError, getFieldState } = useFormContext();

	const state = getFieldState(id);

	const propertyKey = `${id}.srcSet`;

	const [focusModal, openFocusModal] = useModal({
		onSubmit: ({ position }) => setValue(`${id}.position`, position),
		imageToFocus: getValues(id)
	});
	const setFocus = () => openFocusModal();

	const [fileName, setFileName] = useState();

	const onFileChange = async (event) => {
		const file = event.currentTarget.files[0];

		if (!file) return setError(id, { type: 'file', message: copy.requiredField });
		if (!allowedTypes.includes(file.type)) return alert('סוגי הקבצים שנתמכים כאן: jpg, jpeg, png');

		const { base64: imageBase64 } = await limitImageSize(file, 1200);

		xhr.postImage({ imageBase64, fileName: file.name, sizes, siteId: getValues('slug') }).then(({ srcSet }) => {
			setFileName(file.name);
			setValue(propertyKey, srcSet);
		}).catch((err) => {
			alert(err.responseData?.reasoning === 'moderation' ? 'המערכת זיהתה בתמונה תוכן בלתי מתאים מאחד הסוגים הבאים: תוכן למבוגרים, זיוף, דימוי רפואי, תוכן אלים או תוכן פרובוקטיבי. צרו קשר אם מדובר בשגיאה בזיהוי.' : 'אירעה שגיאה בהעלאת התמונה. נסו שנית מאוחר יותר');
		});
	};

	const compoundFieldClassName = classNames(isCompoundField && compoundField, 'is-relative');
	const setFocusButtonStyle = { top: isCompoundField ? '0.35rem' : 0, insetInlineEnd: isCompoundField ? '0.5rem' : 0 };

	return <>

		<div className={compoundFieldClassName}>
			<div className="field file is-large is-boxed has-name is-flex-direction-column">
				<label className="file-label" style={{ width: '100%' }}>
					{label && <span className='label'>{label}:</span>}
					<input type="file" id={id} name={id} onChange={onFileChange} multiple={multiple} accept={acceptedTypes} className='file-input' />
					<input type="text" className="is-hidden" {...register(propertyKey, { required, multiple, accept: acceptedTypes })} />
					<span className="file-cta has-background-white" style={{ border: '1px solid lightgray' }}>
						<span className="file-icon">
							<Upload />
						</span>
						<span className="file-label is-size-6">ליחצו להחלפת התמונה</span>
					</span>
					{fileName && <span className="file-name has-text-centered is-size-7" style={{ maxWidth: "100%" }}>{fileName}</span>}
				</label>
				{state?.error?.message
					? <p className='help is-danger'>{state.error.message}</p>
					: <p className='help'>{description}</p>}
			</div>
			{hasNoFocus || <button type="button" onClick={setFocus} className='button is-small' style={{ position: 'absolute', ...setFocusButtonStyle }}>בחירת פוקוס לתמונה</button>}
			<div className='field'>
				<label htmlFor={`${id}-alt`} className='label is-small'>טקסט חלופי:</label>
				<input id={`${id}-alt`} className='input' type='text' {...register(`${id}.alt`, { setValueAs: cleanUGT })} />
				<p className='help'>{copy.altDescription}</p>
			</div>
		</div>

		<Modal {...focusModal} render={({ setValue, getValues, imageToFocus, watch }) => {

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
				<Title>בחירת פוקוס לתמונה</Title>
				<div className='mx-auto' style={{ width: '20rem' }}>
					<img ref={ref} srcSet={imageToFocus.srcSet} />
				</div>
				<div className='is-flex is-justify-content-space-evenly is-align-items-center mt-5'>
					<div className='mx-auto' style={{ width: '6rem', height: '10rem', overflow: 'hidden' }}>
						<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
					</div>
					<div className='mx-auto' style={{ width: '10rem', height: '6rem', overflow: 'hidden' }}>
						<img srcSet={imageToFocus.srcSet} style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: position }} />
					</div>
				</div>
				<div className='is-flex is-justify-content-end'>
					<button className='button is-primary mt-5'>{copy.submit}</button>
				</div>
			</>;
		}} />

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