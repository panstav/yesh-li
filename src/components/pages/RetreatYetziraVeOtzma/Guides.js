import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import LazyImage from '@elements/LazyImage';

import Heading from './_elements/Heading';

const guides = [
	{
		imageSrc: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/shila-01.jpg',
		alt: 'שילה אורינגר - מנחת הסדנה',
		name: 'שילה אורינגר',
		description: 'מכפר גליקסון, אמנית טבעית החוקרת חומרים נטושים ומתעמקת במשמעות הרוחנית ובריפוי הנפשי שנוצר בתהליך היצירה. שילה מלווה אנשים בתהליכים אלו בסדנאות ורטריטים בהנחייתה בארץ ובחו"ל.'
	},
	{
		imageSrc: 'https://storage.googleapis.com/yeshli-www/samar-retreat-yetzira-ve-otzma/ayelet-01.jpg',
		alt: 'איילת קוזיץ הולצר - מפיקת הסדנה',
		name: 'איילת קוז\'יץ הולצר',
		description: 'חברת קיבוץ סמר, מנהלת את הרזידנסי לאמנים בקיבוץ סמר, יועצת ביוגרפית ועוסקת בחיבור בין אמן לקהילה.'
	}
];

export default function Guides () {
	return <Section>
		<GlassBox>
			<Heading>על המנחה והמפיקה</Heading>
			<div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-flex-gap-4">
				{guides.map((guide) => {
					return <div className='is-flex-grow-1' style={{ flexBasis: 0, minWidth: '20rem' }}>
						<LazyImage src={guide.imageSrc} className="is-round" style={{ width: '100px', borderRadius: '100%' }} />
						<h3 className='mt-2 mb-1 has-text-weight-bold'>{guide.name}</h3>
						<p>{guide.description}</p>
					</div>
				})}
			</div>
		</GlassBox>
	</Section>;
}