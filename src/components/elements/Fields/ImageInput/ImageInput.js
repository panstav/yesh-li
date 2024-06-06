import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { useFieldLabels } from '@hooks/use-i18n';

import { Upload } from '@elements/Icon';
import Loader from '@elements/Loader';

import cleanUGT from '@lib/clean-user-generated-text';

import { acceptedFileSuffixes } from '@pages/Editor';
import { compoundField, imagePreviewContainer } from '@pages/Editor/index.module.sass';

export default function ImageInput({ id, error, label, description, imgId, imgProps, fileName, multiple, onChange, isLoading, isCompoundField, hasNoAlt, hasNoFocus, setFocus, required }) {
	const t = useFieldLabels();
	const { register } = useFormContext();

	const compoundFieldClassName = classNames(isCompoundField && compoundField, 'is-relative field');
	const imagePreviewContainerClassName = classNames(imagePreviewContainer, 'is-relative');
	const setFocusButtonStyle = { top: isCompoundField ? '0.35rem' : '-0.35rem', insetInlineEnd: isCompoundField ? '0.5rem' : 0 };
	const uploadButtonStyle = { backgroundColor: imgProps.srcSet ? 'transparent' : 'white', visibility: isLoading ? 'hidden' : 'visible' };

	return <div className={compoundFieldClassName}>
		<div className="field file is-large is-boxed has-name is-flex-direction-column">
			<label className="file-label w-100">
				{label && <span className='label'>{label}:</span>}
				<input type="file" id={id} name={id} onChange={onChange} multiple={multiple} accept={acceptedFileSuffixes} className='file-input' />
				<input type="text" className="is-hidden" {...register(imgId, { required: required && t.required_field })} />
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
			{error
				? <p className='help is-danger'>{error}</p>
				: <p className='help'>{description}</p>}
		</div>
		{hasNoFocus || <button type="button" onClick={setFocus} className='button is-small' style={{ position: 'absolute', ...setFocusButtonStyle }}>{t.set_image_focus}</button>}
		{hasNoAlt || <div className='field'>
			<label htmlFor={`${id}-alt`} className='label is-small'>{t.image_alt}:</label>
			<input id={`${id}-alt`} className='input' type='text' {...register(`${id}.alt`, { setValueAs: cleanUGT })} />
			<p className='help'>{t.alt_description}</p>
		</div>}
	</div>;
}