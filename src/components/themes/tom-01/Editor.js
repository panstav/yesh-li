import { ImageInput, RichEditor, Repeater, UrlInput } from "@elements/Fields";
import TextInput, { NumberInput } from "@elements/Fields/TextInput";
import Details from "@elements/Details";
import Checkbox from "@elements/Checkbox";

import regexes from "@lib/regexes";

import { compoundField } from '@pages/Editor/index.module.sass';
import { PreviewLink } from "@pages/Editor";
import { useCallback, useRef } from "react";

const defaultImageMaxSize = 610;

export default function Tom_01 () {
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

function SizedFeaturedImage ({ pageId, ...props }) {
	return <ImageInput
		id={`content.pages.${pageId}.featuredImage`}
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

function LinkedDetails({ title, href, children }) {

	const ref = useRef();

	const onClick = useCallback((event) => {
		// when clicking on details title, don't close details, but open if closed
		if (ref.current && ref.current.open) event.stopPropagation();
	}, [ref]);

	return <Details detailsRef={ref} title={() => <PreviewLink {...{ onClick, href }}>{title}</PreviewLink>}>
		{children}
	</Details>;
}