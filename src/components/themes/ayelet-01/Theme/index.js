import GlassBox from '@wrappers/GlassBox';

import usePageContent from '@hooks/use-page-content';

import Details from './Details';
import Hero from './Hero';
import Description from './Description';
import Delimiter from './Delimiter';
import Guides from './Guides';
import Section from './Section';
import Gallery from './Gallery';
import Footer from './Footer';
import Signup from './Signup';

export default function RetreatYetziraVeOtzmaPage() {
	const content = usePageContent();

	content.isSoldOutBool = content.isSoldOut === 'true';
	content.galleryRows = splitGalleryItemsToRows(content.gallery, 3);

	return <>
		<Background />
		<Hero />
		<Description />
		<Delimiter height={100} />
		<Guides />
		<Section withTopMargin={false} className="mt-3">
			<Gallery />
		</Section>
		<Delimiter height={100} />
		<Section className="is-medium">
			<GlassBox>
				<Signup />
			</GlassBox>
		</Section>
		<Delimiter height={100} />
		<Section>
			<Details />
		</Section>
		<Footer />
	</>;
}

function Background() {
	const { featuredImage } = usePageContent();

	return <div data-is-background="1" style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={featuredImage.src} />
	</div>;
}

function splitGalleryItemsToRows(arr, perRow) {

	const rows = [];
	for (let i = 0; i < arr.length; i++) {

		if (!rows.length) rows.push([arr[i]]);
		else if (rows[rows.length - 1].reduce((accu, item) => accu + Number(item.size), 0) >= perRow) {
			rows.push([arr[i]]);
		} else {
			rows[rows.length - 1].push(arr[i]);
		}
	}

	return rows;
}