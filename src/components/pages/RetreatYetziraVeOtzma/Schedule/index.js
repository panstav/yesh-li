import schedule from './schedule';

import Heading from '../../../shared/shila/Heading';

export default function Schedule() {
	return <>
		<Heading>תכנית הריטריט:</Heading>
		<div className="is-flex-desktop is-flex-direction-row is-flex-gap-2 is-justify-content-space-between">
			{schedule.map((day) => {
				return <div key={day.title} className='is-flex-grow-1 mb-3' style={{ flexBasis: 0 }}>
					<span className='is-inline-block has-text-weight-bold mb-2'>{day.title}</span>
					<ul>
						{day.items.map((item) => {
							return <li key={`${day.title}${item}`} className="mb-2">{item}</li>;
						})}
					</ul>
				</div>;
			})}
		</div>
		<span className='has-text-weight-bold'>(יתכנו שינויים ותוספות בתכנית)</span>
	</>;
}