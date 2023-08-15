import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import LazyImage from '@elements/LazyImage';

import Heading from '@shared/shila/Heading';

export default function Guides({ title, children: guides }) {
	return <Section>
		<GlassBox>
			<Heading>{title}</Heading>
			<div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-flex-gap-4">
				{guides.map((guide) => {
					return <div key={guide.name} className='is-flex-grow-1' style={{ flexBasis: 0, minWidth: 'min(100%, 16rem)' }}>
						<LazyImage src={guide.imageSrc} className="is-round" style={{ width: '100px', borderRadius: '100%' }} width="100" height="100" />
						<h3 className='mt-2 mb-1 has-text-weight-bold'>{guide.name}</h3>
						<p>{guide.description}</p>
					</div>;
				})}
			</div>
		</GlassBox>
	</Section>;
}