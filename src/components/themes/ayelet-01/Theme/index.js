import { HeadFor } from '@config/Meta';
import GlassBox from '@wrappers/GlassBox';

import { useSiteContent } from '@hooks/use-site-data';

import Details from './Details';
import Hero from './Hero';
import Description from './Description';
import Delimiter from './Delimiter';
import Guides from './Guides';
import Section from './Section';
import Gallery from './Gallery';
import Footer from './Footer';
import Signup from './Signup';

export const Head = HeadFor(({ pageContext: { content: { description, featuredImage } } }) => {
	return {
		preload: [{ href: featuredImage.src, as: 'image' }],
		description,
		featuredImage: featuredImage.src
	};
});

export default function RetreatYetziraVeOtzmaPage() {
	const content = useSiteContent();

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
	const { featuredImage } = useSiteContent();

	return <div data-is-background="1" style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={featuredImage.src} />
	</div>;
}

function splitGalleryItemsToRows(arr, perRow) {

	const rows = [];
	for (let i = 0; i < arr.length; i++) {

		const iteratedItem = arr[i];

		// if it's the first item, create a new row
		if (!rows.length) rows.push([iteratedItem]);

		// if the current row is full, create a new row
		else if (rows[rows.length - 1].reduce((accu, allocatedItem) => accu + Number(allocatedItem.size), 0) + Number(iteratedItem.size) > perRow) {
			rows.push([iteratedItem]);

		// otherwise, add the item to the current row
		} else rows[rows.length - 1].push(iteratedItem);
	}

	return rows;
}