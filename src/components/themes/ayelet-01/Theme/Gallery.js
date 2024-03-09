import LazyImage from "@elements/LazyImage";

import usePageContent from "@hooks/use-page-content";

export default function Gallery() {
	const { galleryRows } = usePageContent();

	return <div className="is-flex is-flex-direction-column" style={{ gap: '1rem' }}>
		{galleryRows.map((slideRow) => {

			return <div key={slideRow[0].srcSet} className="is-flex is-flex-wrap-wrap" style={{ gap: '1rem' }}>
				{slideRow.map((slide) => {
					slide.className = slide.size === 1 ? 'is-flex-grow-1' : 'is-flex-grow-2';
					return <GalleryItem key={slide.srcSet} {...slide} />;
				})}
			</div>;
		})}
	</div>;
}

function GalleryItem({ srcSet, alt, style = {}, className }) {
	const title = alt;
	return <div {...{ className }} style={{ height: '17rem', borderRadius: '0.5rem', overflow: 'hidden', flexBasis: 0, ...style }}>
		<LazyImage {...{ srcSet, alt, title }} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
	</div>;
}