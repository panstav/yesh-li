import { usePageContent } from "@hooks/use-site-data";

import Section from "@wrappers/Section";
import LazyImage from "@elements/LazyImage";

import PageHeader from "@themes/tom-01/Theme/elements/PageHeader";
import Delimiter from "@themes/tom-01/Theme/elements/Delimiter";
import SmallSection from "@themes/tom-01/Theme/elements/SmallSection";

import { buttonPrimaryColor } from "@themes/tom-01/Theme/lib/css";

export default function ShortFilms() {
	const { title, subtitle, films } = usePageContent('shortFilms');

	return <>
		<PageHeader {...{ title, subtitle }} />
		{films.map((shortFilm, index) => {
			return <Section noTopMargin={!index} key={shortFilm.title}>
				<SingleShortFilm {...shortFilm} lastChild={index === films.length - 1} />
			</Section>;
		})}
	</>;
}

function SingleShortFilm({ poster, title, length, description, credits, watchUrl, lastChild }) {
	return <>

		<LazyImage {...poster} className="mx-auto" style={{ maxHeight: '500px' }} />

		<SmallSection className="mx-auto mt-5">

			<h2 className="is-size-4 is-uppercase has-text-weight-bold">{title}</h2>
			<span className="is-size-7">{length} Min</span>

			<div className="content my-4" dangerouslySetInnerHTML={{ __html: description }} />

			{credits.map(({ creditTitle, creditName }) => {
				return <div key={creditTitle} className="is-flex">
					<span className="">{creditTitle}:&nbsp;</span>
					<span>{creditName}</span>
				</div>;
			})}

			<span className="reset-anchors">
				<a href={watchUrl} target="_blank" rel="noreferrer" className="button mt-5" style={buttonPrimaryColor}>
					Watch
				</a>
			</span>

			{!lastChild && <Delimiter className="mx-auto mt-6 pb-6" />}

		</SmallSection>
	</>;
}