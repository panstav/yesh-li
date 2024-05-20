import { Fragment, act, createContext, useCallback, useContext, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import useI18n from "@hooks/use-i18n";

import Modal, { SaveButton, useModal } from "@wrappers/Modal";
import RenderChildren from "@wrappers/RenderChildren";
import { ImageInput, RichEditor, Repeater, UrlInput } from "@elements/Fields";
import TextInput, { NumberInput } from "@elements/Fields/TextInput";
import DateInput from "@elements/Fields/DateInput";
import Details from "@elements/Details";
import Checkbox from "@elements/Checkbox";

import xhr from "@services/xhr";
import regexes from "@lib/regexes";

import { EditorContext, PreviewLink } from "@pages/Editor";
import { compoundField } from '@pages/Editor/index.module.sass';
import { AuthContext } from "@pages/Editor/Auth";

const defaultImageMaxSize = 610;
const availableTagsId = 'content.collectionPages.tag';

const MethodsContext = createContext();

export default FieldsWrapper;

function Tom_01 () {
	const { siteId } = useContext(AuthContext);
	const { getValues, setValue } = useFormContext();
	const { updateSlug } = useContext(MethodsContext);

	return <>

		<LinkedDetails title="Commercial work" href="/commercial-work">

			<TitleAndSubtitle
				pageId="commercialWork" />

			<Repeater
				arrayId="content.pages.commercialWork.works"
				minLength={2}
				singleName="Commercial work"
				emptyItem={{
					title: 'Work title',
					embedUrl: 'https://vimeo.com/347119375'
				}}>
				{(id) => <>
					<TextInput
						id={`${id}.title`}
						label="Title"
						maxLength={45}
					/>

					<UrlInput isSmall
						id={`${id}.embedUrl`}
						label="Video URL"
						placeholder="https://vimeo.com/347119375"
						pattern={regexes.vimeoOrYoutubeVideoUrl} />
				</>}
			</Repeater>

		</LinkedDetails>

		<LinkedDetails title="Short films" href="/short-films">

			<TitleAndSubtitle
				pageId="shortFilms" />

			<Repeater
				collapseItems="title"
				arrayId="content.pages.shortFilms.films"
				singleName="Film"
				minLength={1}
				emptyItem={{
					title: 'New Film',
					length: '15',
					description: '',
					credits: [],
					watchUrl: 'https://vimeo.com/347119375'
				}}>
				{(filmId) => <>

					<Title
						id={`${filmId}.title`}
						maxLength={40} />

					<NumberInput
						id={`${filmId}.length`}
						label="Length in minutes"
						min={1} />

					<RichEditor
						id={`${filmId}.description`}
						label="Description" />

					<UrlInput
						id={`${filmId}.watchUrl`}
						label="Watch URL"
						required={false} />

					<ImageInput
						hasNoFocus
						id={`${filmId}.poster`}
						label="Poster"
						sizes={[defaultImageMaxSize]} />

					<Repeater
						collapseItems="creditTitle"
						arrayId={`${filmId}.credits`}
						minLength={1}
						singleName={'Credit'}
						emptyItem={{
							creditTitle: 'New Role',
							creditName: ''
						}}>
						{(creditId) => <>

							<TextInput
								id={`${creditId}.creditTitle`}
								label="Role"
								maxLength={30} />

							<TextInput
								id={`${creditId}.creditName`}
								label="Full name/s" />

						</>}
					</Repeater>
				</>}
			</Repeater>

		</LinkedDetails>

		<Details title="Blog">

			<TitleAndSubtitle
				pageId="blog" />

			<CompoundField if={getValues('content.collectionPages.post')?.length}>
				<Repeater
					openItemInModal
					addButtonOnTop
					asyncItems={fetchCollectionPage}
					collapseItems="title"
					arrayId="content.collectionPages.post"
					singleName="Post"
					sortBy="publishDate"
					minLength={1}
					pathKey={({ slug }) => slug && `/blog/${slug}`}
					emptyItem={{
						type: 'post',
						title: "New Post",

						slug: getSlugFor("New Post"),
						// date in the format of: 2021-01-01
						publishDate: new Date().toISOString().split('T')[0],
						contentHtml: "",
						tags: [],
						featuredImage: {
							alt: "",
							srcSet: "https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg"
						}
					}}>
					{(id) => <>

						<Title
							id={`${id}.title`}
							maxLength={100}
							onChange={(title) => updateSlug(`${id}.slug`, title)} />

						<SlugGenerator
							id={`${id}.slug`}
							titleId={`${id}.title`} />

						<RichEditor
							withHeaders withLink withImage
							id={`${id}.contentHtml`}
							label="Content" />

						<Tags
							id={`${id}.tags`}
							titleKey="title"
							options={getValues(availableTagsId)} />

						<DateInput
							id={`${id}.publishDate`}
							label="Publish date" />

						<ImageInput
							id={`${id}.featuredImage`}
							label="Featured image"
							sizes={[350]} />

					</>}
				</Repeater>
			</CompoundField>

			<CompoundField if={getValues(availableTagsId)?.length}>
				<Repeater
					addButtonOnTop
					collapseItems="title"
					asyncItems={fetchCollectionPage}
					arrayId={availableTagsId}
					singleName="Tag"
					onRemove={removeTagFromPosts}
					emptyItem={{
						title: 'New Tag',
						slug: 'new-tag'
					}}>
					{(id) => <NewTag id={id} />}
				</Repeater>
			</CompoundField>

		</Details>

		<LinkedDetails title="Homepage" href="/">

			<TitleAndSubtitle
				pageId="home" />

			<MainContent
				pageId="home" />

		</LinkedDetails>

		<LinkedDetails title="About" href="/about">

			<TitleAndSubtitle
				pageId="about" />

			<MainContent
				pageId="about" />

			<div className={compoundField}>
				<SizedFeaturedImage
					pageId="about"
					isCompoundField={false} />

				<Checkbox
					label="Featured image is vertically aligned"
					id="content.pages.about.featuredImageIsVertical" />
			</div>

		</LinkedDetails>

		<LinkedDetails title="Contact" href="/contact">

			<TitleAndSubtitle
				pageId="contact" />

		</LinkedDetails>

		<Details title="General">

			<Title
				id="title" />

			<SizedFeaturedImage
				id="content.featuredImage" />

			<ImageInput
				hasNoFocus hasNoAlt
				id="content.backgroundImage"
				label="Background image"
				sizes={[600]} />

		</Details>

	</>;

	async function fetchCollectionPage({ docId }) {
		return xhr.getCollectionPage({ siteId, pageId: docId });
	}

	function removeTagFromPosts(removedItem) {
		const posts = getValues('content.collectionPages.post');

		for (const post of posts) {
			post.tags = post.tags.filter((tag) => tag.title !== removedItem.title);
		}

		setValue('content.collectionPages.post', posts);
	}

}

function NewTag ({ id, hideModal }) {
	const [{ misc: t }] = useI18n();
	const { getValues } = useFormContext();
	const { updateSlug } = useContext(MethodsContext);

	const index = Number(id.split('.').pop());
	const availableTagTitles = getValues(availableTagsId).filter((tag, availableIndex) => availableIndex !== index).map((tag) => tag.title);
	const availableTagSlugs = getValues(availableTagsId).filter((tag, availableIndex) => availableIndex !== index).map((tag) => tag.slug);

	return <>
		<TextInput
			id={`${id}.title`}
			label="Tag name"
			maxLength={20}
			validate={{ unique: validateUniqueness(availableTagTitles, "This tag already exists.")}}
			onChange={(title) => updateSlug(`${id}.slug`, title)} />

		<SlugGenerator
			id={`${id}.slug`}
			titleId={`${id}.title`}
			validate={{ unique: validateUniqueness(availableTagSlugs, "This slug already exists.") }} />

		{hideModal && <SaveButton onClick={hideModal}>{t.continue}</SaveButton>}
	</>;

}

function CompoundField(props) {
	const Wrapper = ((typeof props.if === 'function' && props.if()) || props.if || !Object.keys(props).includes('if')) ? 'div' : RenderChildren;
	return <Wrapper className={compoundField}>
		{props.children}
	</Wrapper>;
}

function FieldsWrapper() {

	const { getFieldState, getValues, setValue } = useFormContext();

	return <MethodsContext.Provider value={{ updateSlug }}>
		<Tom_01 />
	</MethodsContext.Provider>;

	function updateSlug(slugId, titleOrId, { force } = {}) {
		if (!force && getFieldState(slugId)?.isTouched) return;
		const title = getValues(titleOrId) || titleOrId;
		setValue(slugId, getSlugFor(title), { shouldValidate: true });
	}

}

function TitleAndSubtitle ({ pageId }) {
	return <>
		<PageTitle pageId={pageId} />
		<PageSubtitle pageId={pageId} required={false} />
	</>;
}

function PageTitle ({ pageId, ...props }) {
	return <Title
		id={`content.pages.${pageId}.title`}
		{...props} />;
}

function PageSubtitle ({ pageId, ...props }) {
	return <TextInput
		id={`content.pages.${pageId}.subtitle`}
		label="Subtitle"
		maxLength={50}
		required={false}
		{...props} />;
}

function Title (props) {
	return <TextInput
		label="Title"
		maxLength={20}
		{...props} />;
}

function SlugGenerator({ id, titleId, validate }) {
	const [{ Editor: t }] = useI18n();
	const { updateSlug } = useContext(MethodsContext);

	const forceUpdateSlug = () => updateSlug(id, titleId, { force: true });

	const inputProps = {
		id,
		pattern: { value: regexes.slug, message: t.AttachSlug.valid_slug_requirements }
	};

	if (validate) inputProps.validate = validate;

	return <>
		<div className="label" htmlFor={id}>Slug:</div>
		<div className="field is-grouped">
			<div className="control is-expanded">
				<TextInput {...inputProps} />
			</div>
			<div className="control">
				<button onClick={forceUpdateSlug} className="button is-primary">
					Generate
				</button>
			</div>
		</div>
	</>;
}

function SizedFeaturedImage ({ pageId, id, ...props }) {
	if (pageId) id = `content.pages.${pageId}.featuredImage`;
	return <ImageInput
		id={id}
		label="Featured image"
		sizes={[defaultImageMaxSize]}
		{...props} />;
}

function MainContent ({ pageId = '', ...props }) {
	return <RichEditor
		withHeaders withLink
		id={`content.pages.${pageId}.contentHtml`}
		label="Content"
		{...props} />;
}

function Tags({ id, titleKey, options = [] }) {

	const { getValues, setValue } = useFormContext();
	const currentTags = useWatch({ name: id, defaultValue: [] });

	const ref = useRef();

	const [newTagModel, showNewTagModal] = useModal();

	const defaultOptionValue = `default-to-${id}`;
	const newOptionValue = `new-to-${id}`;

	const onChange = (event) => {
		const chosenTitle = event.currentTarget.value;
		if (currentTags.find((activeTag) => activeTag[titleKey] === chosenTitle)) return;
		if (chosenTitle === newOptionValue) return addNewTag();
		setValue(id, currentTags.concat(options.find((option) => option[titleKey] === chosenTitle)));
		ref.current.value = defaultOptionValue;
	};

	const removeItem = (event) => {
		const chosenTitle = event.currentTarget.closest('[data-title]').dataset.title;
		setValue(id, currentTags.filter((tag) => tag[titleKey] !== chosenTitle));
	};

	return <>
		<div className="field">
			<div className="select is-fullwidth">
				<select ref={ref} defaultValue={defaultOptionValue} onChange={onChange}>
					<option value={defaultOptionValue} disabled>Add tags to post</option>
					{options.map((option) => <option key={option[titleKey]} value={option[titleKey]}>{option[titleKey]}</option>)}
					<option value={newOptionValue}>Create a new tag</option>
				</select>
			</div>
			{!!currentTags.length && <div className="tags mt-2">
				{currentTags.map((tag) => <span key={tag[titleKey]} data-title={tag[titleKey]} className="tag">
					{tag[titleKey]}
					<button className="delete is-small" onClick={removeItem}></button>
				</span>)}
			</div>}
		</div>

		<Modal {...newTagModel} render={NewTag} />
	</>;

	function addNewTag() {
		const previousTags = getValues(availableTagsId);
		const newTagId = `${availableTagsId}.${previousTags?.length || 0}`;
		return showNewTagModal({
			id: newTagId,
			onHide: () => setValue(id, getValues(id).concat(getValues(newTagId)), { shouldValidate: true })
		});
	}

}

function LinkedDetails({ title, href, children }) {
	if (!href) throw new Error('LinkedDetails must have an href prop');

	const ref = useRef();

	const onClick = useCallback((event) => {
		// when clicking on details title, don't close details, but open if closed
		if (ref.current && ref.current.open) event.stopPropagation();
	}, [ref]);

	return <Details detailsRef={ref} title={() => <PreviewLink {...{ onClick, href }}>{title}</PreviewLink>}>
		{children}
	</Details>;
}

function getSlugFor(str) {
	let res = str.toLowerCase().replace(regexes.nonSlugParts, '-');
	if (res.startsWith('-')) res = res.slice(1);
	if (res.endsWith('-')) res = res.slice(0, -1);
	return res;
}

function validateUniqueness(hay, errorMessage) {
	return (needle) => hay.every((item) => item !== needle) || errorMessage;
}