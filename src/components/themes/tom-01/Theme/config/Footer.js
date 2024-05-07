import { Fragment } from 'react';

import Section from '@wrappers/Section';

import { Instagram } from '@elements/Icon';
import OutboundLink from '@elements/OutboundLink';
import AllowInteractionOnPreview from '@elements/AllowInterationOnPreview';

import routes from '@themes/tom-01/Theme/lib/menu-items';

export default function Footer() {
	return <footer className='has-background-black has-text-white mt-6 pt-5 pb-4'>
		<Section className='reset-anchors'>
			<Nav routes={routes} />
			<Copyright />
		</Section>
	</footer>;
}

function Nav() {
	const navItemClassName = 'has-text-white py-2 px-1';
	return <nav>
		<ol className='is-flex is-justify-content-center is-flex-wrap-wrap gap-5' style={{ fontSize: '1.2rem', listStyle: 'none' }}>
			{routes.map(({ slug, label, sub }) => {
				return <Fragment key={slug}>
					{sub ? null : <li style={{ lineHeight: 1 }}>
						<AllowInteractionOnPreview component="a" href={`/${slug}`} className={navItemClassName}>{label}</AllowInteractionOnPreview>
					</li>}
					{sub && sub.map(({ slug, label }) => {
						return <li key={slug} style={{ lineHeight: 1 }}>
							<AllowInteractionOnPreview component="a" href={`/${slug}`} className={navItemClassName}>{label}</AllowInteractionOnPreview>
						</li>;
					})}
				</Fragment>;
			})}
			<OutboundLink href="https://instagram.com/tom_bezrukov" className="has-text-white">
				<Instagram style={{ marginTop: '-2px' }} />
			</OutboundLink>
		</ol>
	</nav>;
}

function Copyright() {
	return <div className='has-text-centered mt-6 mb-4'>
		<a className='has-text-white' href="/">Tom Bezrukov</a> © {(new Date()).getFullYear()}
	</div>;
}