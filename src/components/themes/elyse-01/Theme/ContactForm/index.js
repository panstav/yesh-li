import Section from '@wrappers/Section';
import xhr from '@services/xhr';

import useFetch from '@hooks/use-fetch';
import usePageData from '@hooks/use-page-data';

import Fields from './FormFields';

export default function ContactForm() {
	const { content: { ctaHeader } } = usePageData();
	const [postLead, isSuccess, isError] = useFetch(xhr.createLead);

	return <>
		<span id="contact-form" />
		<div style={{ position: 'relative', marginTop: '8rem' }}>
			<div style={{ margin: 'auto', filter: 'blur(100px)', borderRadius: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', width: '100%', height: '750px', opacity: '0.1', backgroundColor: `var(--color-primary)`, zIndex: '-10' }} />
			<Section className='is-medium'>

				<div className='has-background-white has-strong-radius py-5 px-4'>
					<h2 className='is-size-4 has-text-centered mb-5' style={{ color: 'var(--color-primary)' }}>{ctaHeader}</h2>
					<form onSubmit={postLead}>
						<Fields {...{ isSuccess, isError }} />
					</form>
				</div>

			</Section>
		</div>
	</>;

}