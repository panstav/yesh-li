import classNames from "classnames";

import { Title } from "@wrappers/Modal";
import xhr from "@services/xhr";

import copy from "../copy";

export default function SlugChoice ({ register, getFieldState, formState }) {

	const id = 'slug';
	const { error } = getFieldState(id, formState);

	const buttonClassName = classNames('button is-primary', formState.isSubmitting && 'is-loading');

	return <>
		<Title>כתובת קבועה לעמוד</Title>
		<div className="field has-addons">
			<div className="control is-flex-grow-1">
				<input className="input is-ltr" type="text" {...register(id, {
					required: true,
					validate: { vacantSlug },
					pattern: { value: /^[a-zA-Z-0-9]+$/, message: 'כתובת העמוד יכולה להכיל אותיות באנגלית, ספרות ומקפים בלבד.' },
					maxLength: { value: 30, message: copy.maxLengthField(30) }
				})} />
				{error?.message && <p className='help is-danger'>{error?.message}</p>}
			</div>
			<div className="control">
				<a className="button is-static is-ltr">{location.origin}/</a>
			</div>
		</div>
		<div className='is-flex is-justify-content-end'>
			<button className={buttonClassName}>שמור</button>
		</div>
	</>;
}

async function vacantSlug(slug) {
	return xhr.checkSlugVacancy(slug).then(({ isVacant }) => isVacant || 'כתובת זו אינה זמינה.');
}