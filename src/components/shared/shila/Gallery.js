import LazyImage from "@elements/LazyImage";

export default function Gallery({ children }) {

	return <div className="is-flex is-flex-direction-column" style={{ gap: '1rem' }}>
		{children.map((slideRow) => <div key={slideRow[0].src} className="is-flex is-flex-wrap-wrap" style={{ gap: '1rem' }}>
			{slideRow.map((slide) => <GalleryItem key={slide.src} {...slide} />)}
		</div>)}
	</div>;
}

function GalleryItem({ src, alt, style = {}, className }) {
	const title = alt;
	return <div {...{ className }} style={{ height: '17rem', borderRadius: '0.5rem', overflow: 'hidden', flexBasis: 0, ...style }}>
		<LazyImage {...{ src, alt, title }} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
	</div>;
}