import { useContext } from 'react';

import { PageContext } from '@config/Page';

import GlassBox from '@wrappers/GlassBox';
import LazyImage from '@elements/LazyImage';

import Heading from './Heading';
import Section from './Section';

export default function Guides() {
	const { content: { guides } } = useContext(PageContext);

	return <Section>
		<GlassBox>
			<Heading>על שילה ואיילת:</Heading>
			<div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-flex-gap-4">
				{guides.map((guide) => {
					return <div key={guide.name} className='is-flex-grow-1' style={{ flexBasis: 0, minWidth: 'min(100%, 16rem)' }}>
						<LazyImage {...guide.image} className="is-round" style={{ width: '100px', borderRadius: '100%' }} width="100" height="100" />
						<h3 className='mt-2 mb-1 has-text-weight-bold'>{guide.name}</h3>
						<p>{guide.description}</p>
					</div>;
				})}
			</div>
		</GlassBox>
	</Section>;
}