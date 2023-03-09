import { useContext } from 'react';

import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import { PageContext } from '@shared/shila/contexts';
import Signup from '@shared/shila/Signup';

export default function Description ({ children }) {
	return <>
		<Section withTopMargin={false} style={{ marginTop: '25vh', marginBottom: '25vh', textShadow: '0 0 10px white' }}>
			<Title />
		</Section>
		<Section className="mt-5 is-medium">
			<GlassBox>
				<div className='mt-5 content'>
					{children}
				</div>
				<Signup className="mt-6" />
			</GlassBox>
		</Section>
	</>;
}

function Title() {
	const { title, dates, isSoldOut } = useContext(PageContext);
	return <h1 className="has-text-centered">
		<div className="is-size-2 has-text-weight-bold">{title}</div>
		<span className="is-size-3 has-text-weight-bold has-text-grey">{dates}</span>
		{isSoldOut && <>
			<br />
			<div className="is-size-4 has-text-weight-bold has-text-danger-dark mt-5">הסדנא מלאה</div>
			<span className="is-size-6 has-text-weight-bold has-text-danger-dark">ניתן להשאיר פרטים לקבלת עידכונים על הסדנאות הבאות</span>
		</>}
	</h1>;
}