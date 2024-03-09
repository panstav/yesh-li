import GlassBox from '@wrappers/GlassBox';

import Section from './Section';
import Signup from './Signup';
import usePageContent from '@hooks/use-page-content';

export default function Description () {
	const { topDescription } = usePageContent();

	return <>
		<Section withTopMargin={false} style={{ marginTop: '25vh', marginBottom: '25vh', textShadow: '0 0 10px white' }}>
			<Title />
		</Section>
		<Section className="mt-5 is-medium">
			<GlassBox>
				<div className='mt-5 content' dangerouslySetInnerHTML={{ __html: topDescription }} />
				<Signup className="mt-6" />
			</GlassBox>
		</Section>
	</>;
}

function Title() {
	const { titleRow1, titleRow2, eventDate, isSoldOutBool } = usePageContent();

	return <h1 className="has-text-centered">
		<div className="is-size-2 has-text-weight-bold">
			{titleRow1}
			<br />
			{titleRow2}
		</div>
		<span className="is-size-3 has-text-weight-bold has-text-grey">{eventDate}</span>
		{isSoldOutBool && <>
			<br />
			<div className="is-size-4 has-text-weight-bold has-text-danger-dark mt-5">הסדנא מלאה</div>
			<span className="is-size-6 has-text-weight-bold has-text-danger-dark">ניתן להשאיר פרטים לקבלת עידכונים על הסדנאות הבאות</span>
		</>}
	</h1>;
}