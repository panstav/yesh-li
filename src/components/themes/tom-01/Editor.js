import { createContext, useCallback, useContext, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import useI18n from "@hooks/use-i18n";

import Modal, { SaveButton, useModal } from "@wrappers/Modal";
import RenderChildren from "@wrappers/RenderChildren";
import { ImageInput, RichEditor, UrlInput } from "@elements/Fields";
import Repeater, { ArrayOrderControlContext } from "@elements/Fields/Repeater";
import TextInput, { NumberInput } from "@elements/Fields/TextInput";
import DateInput from "@elements/Fields/DateInput";
import Details from "@elements/Details";
import Checkbox from "@elements/Checkbox";

import regexes from "@lib/regexes";
import getCollectionPagePrefix from "@lib/get-collection-page-prefix";

import { PreviewLink } from "@pages/Editor";
import { compoundField } from '@pages/Editor/index.module.sass';

const defaultImageMaxSize = 610;
const availableTagsId = 'content.collectionPages.tag';

const MethodsContext = createContext();

const emptyTag = { title: 'New Tag', slug: 'new-tag' };
const emptyPortfolioPost = { image: { alt: "", srcSet: "https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg" }, isFeatured: false };

export default FieldsWrapper;

function Tom_01 () {
	const { getValues, setValue, getFieldState } = useFormContext();
	const { updateSlug } = useContext(MethodsContext);

	const theme = getValues('theme');
	const blogPrefix = getCollectionPagePrefix(theme, 'post');
	const portfolioPrefix = getCollectionPagePrefix(theme, 'portfolio');

	return <>

		<LinkedDetails title="Portfolio" href="/portfolio">

			<TitleAndSubtitle
				pageId="portfolio" />

			<Repeater
				addButtonOnTop
				openItemInModal
				arrayId="content.collectionPages.portfolio"
				collapseItems="title"
				singleName="Portfolio post"
				pathKey={(id) => {
					const slugId = `${id}.slug`;
					return getFieldState(slugId).isDirty ? null : `/${portfolioPrefix}/${getValues(slugId)}`;
				}}
				emptyItem={{
					type: 'portfolio',
					title: "New Portfolio Post",
					slug: getSlugFor("New Portfolio Post"),
					publishDate: new Date().toISOString().split('T')[0],
					images: [emptyPortfolioPost]
				}}>
				{(id) => <>

					<Title
						id={`${id}.title`}
						maxLength={100}
						onChange={(title) => updateSlug(`${id}.slug`, title)}
						debounceOnChange={500}
						unique={{ id, key: 'title', name: 'post' }} />

					<SlugGenerator
						id={`${id}.slug`}
						titleId={`${id}.title`}
						unique={{ id, key: 'slug' }} />

					<Repeater
						arrayId={`${id}.images`}
						minLength={1}
						singleName="Image"
						itemIcon="image"
						emptyItem={emptyPortfolioPost}>
						{(imageId) => <>
							<ImageInput
								hasNoFocus
								id={`${imageId}.image`}
								label="Image"
								sizes={[defaultImageMaxSize]} />

							<Checkbox
								id={`${imageId}.isFeatured`}
								onChange={(isFeatured) => !isFeatured ? null : unfeatureOtherImages(`${id}.images`, imageId)}
								label="Featured image" />
						</>}
					</Repeater>

				</>}
			</Repeater>

		</LinkedDetails>

		<LinkedDetails title="Blog" href="/blog"																																								>

			<TitleAndSubtitle
				pageId="blog" />

			<CompoundField if={getValues('content.collectionPages.post')?.length}>
				<Repeater
					openItemInModal
					addButtonOnTop
					collapseItems="title"
					arrayId="content.collectionPages.post"
					singleName="Post"
					sortBy="publishDate"
					minLength={1}
					pathKey={(id) => {
						const slugId = `${id}.slug`;
						return getFieldState(slugId).isDirty ? null : `/${blogPrefix}/${getValues(slugId)}`;
					}}
					emptyItem={{
						type: 'post',
						title: "New Post",
						slug: getSlugFor("New Post"),
						// date in the format of: 2021-01-01
						publishDate: new Date().toISOString().split('T')[0],
						contentHtml: "",
						tags: [emptyTag],
						featuredImage: {
							alt: "",
							srcSet: "https://storage.googleapis.com/yeshli-www/assets/placeholder-250x250-01.jpg"
						}
					}}>
					{(id) => <>

						<Title
							id={`${id}.title`}
							maxLength={100}
							onChange={(title) => updateSlug(`${id}.slug`, title)}
							debounceOnChange={500}
							unique={{ id, key: 'title', name: 'post' }} />

						<SlugGenerator
							id={`${id}.slug`}
							titleId={`${id}.title`}
							unique={{ id, key: 'slug' }} />

						<RichEditor
							withHeaders withLink withImage
							id={`${id}.contentHtml`}
							label="Content" />

						<Tags
							id={`${id}.tags`}
							titleKey="title"
							emptyItem={emptyTag} />

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
					arrayId={availableTagsId}
					singleName="Tag"
					onRemove={removeTagFromPosts}
					emptyItem={emptyTag}>
					{(id) => <TagInput id={id} />}
				</Repeater>
			</CompoundField>

		</LinkedDetails>

		<LinkedDetails title="Commercial work" href="/commercial-work">

			<TitleAndSubtitle
				pageId="commercialWork" />

			<Repeater
				arrayId="content.pages.commercialWork.works"
				minLength={2}
				singleName="Commercial work"
				collapseItems="title"
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
				hasNoFocus
				id="content.featuredImage" />

			<ImageInput
				hasNoFocus hasNoAlt
				id="content.backgroundImage"
				label="Background image"
				sizes={[600]} />

		</Details>

	</>;

	function unfeatureOtherImages(arrayId, ownId) {
		const images = getValues(arrayId);
		images.forEach((image, index) => {
			const imageId = `${arrayId}.${index}`;
			if (!image.isFeatured || imageId === ownId) return;
			setValue(`${imageId}.isFeatured`, false);
		});
	}

	function removeTagFromPosts(removedItem) {

		const posts = getValues('content.collectionPages.post');

		for (const post of posts) {
			post.tags = post.tags.filter((tag) => tag.title !== removedItem.title);
		}

		setValue('content.collectionPages.post', posts);
	}

}

function TagInput ({ id, hideModal }) {
	const [{ misc: t }] = useI18n();
	const { getValues, setValue } = useFormContext();
	const { updateSlug } = useContext(MethodsContext);

	const existingPosts = getValues('content.collectionPages.post');
	const affectedPosts = existingPosts
		.reduce((accu, { tags }, postIndex) => {
			const tagIndex = tags.findIndex((tag) => tag.title === getValues(`${id}.title`));
			if (!~tagIndex) return accu;
			accu.push({ postIndex, tagIndex });
			return accu;
		}, []);

	return <>
		<TextInput
			id={`${id}.title`}
			label="Tag name"
			maxLength={20}
			unique={{ id, key: 'title', name: 'tag' }}
			debounceOnChange={500}
			onChange={(title) => {
				updateAffectedPosts({ title });
				return updateSlug(`${id}.slug`, title);
			}} />

		<SlugGenerator
			id={`${id}.slug`}
			titleId={`${id}.title`}
			unique={{ id, key: 'slug' }}
			onChange={(slug) => updateAffectedPosts({ slug })} />

		{hideModal && <SaveButton onClick={hideModal}>{t.continue}</SaveButton>}
	</>;

	function updateAffectedPosts(obj) {
		for (const { postIndex, tagIndex } of affectedPosts) {
			Object.keys(obj).forEach((key) => existingPosts[postIndex].tags[tagIndex][key] = obj[key]);
			setValue(`content.collectionPages.post.${postIndex}`, existingPosts[postIndex]);
		}
	}

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
		setValue(slugId, getSlugFor(title), { shouldValidate: true, shouldDirty: true });
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

function SlugGenerator({ id, titleId, validate, unique, onChange }) {
	const [{ Editor: t }] = useI18n();
	const { isPreviewing } = useContext(ArrayOrderControlContext);
	const { updateSlug } = useContext(MethodsContext);

	const forceUpdateSlug = () => updateSlug(id, titleId, { force: true });

	const inputProps = {
		id,
		disabled: isPreviewing,
		pattern: { value: regexes.slug, message: t.AttachSlug.valid_slug_requirements }
	};

	if (validate) inputProps.validate = validate;
	if (unique) inputProps.unique = unique;
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

function Tags({ id, titleKey, emptyItem }) {

	const { getValues, setValue } = useFormContext();
	const { fields: activeTags, append: appendActiveTag } = useFieldArray({ name: id });
	const { fields: availableTags, append: appendAvailableTag } = useFieldArray({ name: availableTagsId });

	const ref = useRef();

	const [newTagModel, showNewTagModal] = useModal();

	const defaultOptionValue = `default-to-${id}`;
	const newOptionValue = `new-to-${id}`;

	const onChange = (event) => {
		const chosenTitle = event.currentTarget.value;

		// if the user chose to create a new tag, show the modal
		if (chosenTitle === newOptionValue) {
			addNewTag();
			return resetSelect();
		}

		// if the tag is already active, don't add it to the post again
		if (activeTags.find((activeTag) => activeTag[titleKey] === chosenTitle)) return resetSelect();

		// otherwise add the tag to the post
		// eslint-disable-next-line no-unused-vars
		const { docId, ...tagToAdd } = availableTags.find((option) => option[titleKey] === chosenTitle);
		appendActiveTag(tagToAdd);

		// and reset the select to the default value
		resetSelect();

		function resetSelect() {
			ref.current.value = defaultOptionValue;
		}
	};

	const removeItem = (event) => {
		const chosenTitle = event.currentTarget.closest('[data-title]').dataset.title;
		setValue(id, activeTags.filter((tag) => tag[titleKey] !== chosenTitle));
	};

	return <>
		<div className="field">
			<div className="select is-fullwidth">
				<select ref={ref} defaultValue={defaultOptionValue} onChange={onChange}>
					<option value={defaultOptionValue} disabled>Add tags to post</option>
					{availableTags.map((option) => <option key={option[titleKey]} value={option[titleKey]}>{option[titleKey]}</option>)}
					<option value={newOptionValue}>Create a new tag</option>
				</select>
			</div>
			{!!activeTags.length && <div className="tags mt-2">
				{activeTags.map((tag) => <span key={tag[titleKey]} data-title={tag[titleKey]} className="tag">
					{tag[titleKey]}
					<button className="delete is-small" onClick={removeItem}></button>
				</span>)}
			</div>}
		</div>

		<Modal {...newTagModel} render={TagInput} />
	</>;

	function addNewTag() {
		// create a new tag id
		appendActiveTag(emptyItem);

		const newTagId = `${id}.${activeTags?.length || 0}`;
		// have the modal control the creation of the new tag at the availableTags array
		// and save the new tag to the post when the modal is closed
		return showNewTagModal({
			id: newTagId,
			onHide: () => appendAvailableTag(getValues(newTagId))
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