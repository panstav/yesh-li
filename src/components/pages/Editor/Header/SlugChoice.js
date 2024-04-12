import classNames from "classnames";

import xhr from "@services/xhr";
import useI18n from "@hooks/use-i18n";

import { Title } from "@wrappers/Modal";
import UrlInputWithAddon from "@elements/Fields/UrlInputWithAddon";

export default function SlugChoice ({ formState }) {

	const [{ Editor: { fieldLabels: fieldT, AttachSlug: slugT } }] = useI18n();

	const id = 'slug';

	const buttonClassName = classNames('button is-primary', formState.isSubmitting && 'is-loading');

	const vacantSlug = async (slug) => {
		return xhr.checkSlugVacancy(slug).then(({ isVacant }) => isVacant || slugT.address_unavailable);
	};

	return <>
		<Title>{slugT.title}</Title>
		<UrlInputWithAddon
			id={id}
			prefix={location.origin}
			validate={{ vacantSlug }}
			pattern={{ value: /^[a-zA-Z-0-9]+$/, message: slugT.valid_slug_requirements }}
			minLength={{ value: 4, message: fieldT.minLengthField(4) }}
			maxLength={{ value: 30, message: fieldT.maxLengthField(30) }}
		/>
		<div className='is-flex is-justify-content-end'>
			<button className={buttonClassName}>{slugT.submit_label}</button>
		</div>
	</>;
}