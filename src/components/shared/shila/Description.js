import { useContext } from 'react';

import Section from '@wrappers/Section';
import GlassBox from '@wrappers/GlassBox';

import { PageContext } from '@shared/shila/contexts';
import Signup from '@shared/shila/Signup';

export default function Description ({ children }) {
	return <Section withTopMargin={false} className="mt-5 is-medium">
		<GlassBox>
			<Title />
			<div className='mt-5 content'>
				{children}
			</div>
			<Signup className="mt-6" />
		</GlassBox>
	</Section>;
}

function Title() {
	const { title, dates, isSoldOut } = useContext(PageContext);
	return <h1 className="has-text-centered">
		<span className="is-size-2 has-text-weight-bold">{title}</span>
		<br />
		<span className="is-size-3 has-text-weight-bold has-text-grey">{dates}</span>
		{isSoldOut && <>
			<br />
			<span className="is-size-5 has-text-weight-bold has-text-danger-dark">הסדנא מלאה</span>
			<br />
			<span className="is-size-6 has-text-weight-bold has-text-danger-dark">ניתן להשאיר פרטים לקבלת עידכונים על הסדנאות הבאות</span>
		</>}
	</h1>;
}