import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import Hero from "./Hero";
import Description from "./Description";
import Schedule from "./Schedule";
import Guides from "./Guides";
import Signup from './Signup';
import Gallery from './Gallery';
import Details from './Details';
import Footer from './Footer';

import slides from './_data/slides';

RetreatYetziraVeOtzmaPage.config = {
	title: 'ריטריט יצירה ועוצמה בערבה',
	description: 'יצירה בחומרים נטושים וחומרי טבע בסטודיו בלב המדבר.',
	background: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/background-01.jpg',

	emailAddress: 'ksamardigital@gmail.com'
};

export default function RetreatYetziraVeOtzmaPage() {
	return <>
		<Hero />
		<Description />
		<Delimiter height={100} />
		<Guides />
		<Section withTopMargin={false} className="mt-3">
			<GlassBox>
				<Schedule />
			</GlassBox>
		</Section>
		<Delimiter height={100} />
		<Section className="is-medium">
			<GlassBox>
				<Signup />
			</GlassBox>
		</Section>
		<Delimiter height={100} />
		<Section>
			<Gallery>{slides}</Gallery>
		</Section>
		<Section>
			<GlassBox>
				<Details />
			</GlassBox>
		</Section>
		<Footer />
	</>;
}

function Delimiter({ height }) {
	return <div style={{ height: `${height}px` }} />;
}