import classNames from "classnames";

import xhr from "@services/xhr";

import { Title } from "@wrappers/Modal";
import UrlInputWithAddon from "@elements/Fields/UrlInputWithAddon";

import copy from "../copy";

export default function SlugChoice ({ formState }) {

	const id = 'slug';

	const buttonClassName = classNames('button is-primary', formState.isSubmitting && 'is-loading');

	return <>
		<Title>כתובת קבועה לעמוד</Title>
		<UrlInputWithAddon
			id={id}
			prefix={location.origin}
			validate={{ vacantSlug }}
			pattern={{ value: /^[a-zA-Z-0-9]+$/, message: 'כתובת העמוד יכולה להכיל אותיות באנגלית, ספרות ומקפים בלבד.' }}
			minLength={{ value: 4, message: copy.minLengthField(4) }}
			maxLength={{ value: 30, message: copy.maxLengthField(30) }}
		/>
		<div className='is-flex is-justify-content-end'>
			<button className={buttonClassName}>שמור</button>
		</div>
	</>;
}

async function vacantSlug(slug) {
	return xhr.checkSlugVacancy(slug).then(({ isVacant }) => isVacant || 'כתובת זו אינה זמינה.');
}