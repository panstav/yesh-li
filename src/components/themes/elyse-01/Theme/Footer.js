import { useContext } from 'react';

import Section from '@wrappers/Section';

import { PageContext } from '.';
import Socials from './Socials';

export default function Footer () {
	const { css, content: { fullName, socials } } = useContext(PageContext);

	return <footer className="footer has-text-centered has-background-white pb-5" style={{ borderTop: css.border }}>

		<h2 className='is-size-3 pt-2 my-6'>{fullName}</h2>

		{!!Object.keys(socials).length && <Section noTopMargin className="is-large">
			<Socials className="is-centered is-flex-gap-2 are-medium" />
		</Section>}

		<Section noTopMargin>
			<hr />
			<span className='has-text-grey-light'>© {new Date().getFullYear()} {fullName} כל הזכויות שמורות</span>
		</Section>

	</footer>;
}