import { useContext } from "react";

import { ImageInput, TextInput, UrlInput } from "@elements/Fields";
import CompoundField from "@elements/CompoundField";
import Checkbox from "@elements/Checkbox";

import useI18n from "@hooks/use-i18n";

import { ArrayOrderControlContext } from "@elements/Fields/Repeater";

import regexes from "@lib/regexes";

import { DomainControlContext } from "@domains/india4wdtours/Admin";

export function Hero({ id, withCta, withSlug, withDarkBackgroundCheckbox }) {
	const { updateSlug } = useContext(DomainControlContext);

	const titleProps = {};
	if (withSlug) titleProps.onChange = (title) => updateSlug(`${id}.slug`, title);

	return <>

		<Title
			id={id}
			{...titleProps} />

		<Subtitle
			id={id}
			required={false} />

		{withSlug && <SlugGenerator
			isUnique
			id={id}
			titleId={`${id}.title`} />}

		{withCta && <CompoundField>
			<TextInput
				id={`${id}.cta.label`}
				label="CTA Text" />
			<UrlInput
				isRelative
				label="Href"
				id={`${id}.cta.href`} />
		</CompoundField>}

		<CompoundField if={withDarkBackgroundCheckbox}>
			<FeaturedImage
				id={id}
				isCompoundField={!withDarkBackgroundCheckbox} />
			{withDarkBackgroundCheckbox && <Checkbox
				id={`${id}.isBackgroundDark`}
				label="Background is dark" />}
		</CompoundField>
	</>;
}

export function Title({ id, ...props }) {
	return <TextInput
		id={`${id}.title`}
		label="Title"
		maxLength={30}
		{...props} />;
}

function Subtitle({ id, ...props }) {
	return <TextInput
		id={`${id}.subtitle`}
		label="Subtitle"
		maxLength={100}
		{...props} />;
}

function FeaturedImage({ id, ...props }) {
	return <ImageInput
		id={`${id}.featuredImage`}
		label="Featured image"
		sizes={[1200]}
		{...props} />;
}

function SlugGenerator({ id, titleId, validate, isUnique, onChange }) {
	const slugId = `${id}.slug`;

	const [{ Editor: t }] = useI18n();
	const { isPreviewing } = useContext(ArrayOrderControlContext);
	const { updateSlug } = useContext(DomainControlContext);

	const forceUpdateSlug = () => updateSlug(slugId, titleId, { force: true });

	const inputProps = {
		id: slugId,
		disabled: isPreviewing,
		pattern: { value: regexes.slug, message: t.AttachSlug.valid_slug_requirements }
	};

	if (validate) inputProps.validate = validate;
	if (isUnique) inputProps.unique = { id, key: "slug" };
	if (onChange) inputProps.onChange = onChange;

	return <>
		<div className="label" htmlFor={id}>Slug:</div>
		<div className="field is-grouped">
			<div className="control is-expanded">
				<TextInput {...inputProps} />
			</div>
			<div className="control">
				<button onClick={forceUpdateSlug} className="button">
					Generate
				</button>
			</div>
		</div>
	</>;
}