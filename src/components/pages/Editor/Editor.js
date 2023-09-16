import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import xhr from '@services/xhr';
import Section from '@wrappers/Section';
import Loader from '@elements/Loader';

import { UserContext } from '.';

import ThemeFields from './ThemeFieldGroups';
import Preview from './Preview';

export default function Editor () {

	const { sites: [siteId] } = useContext(UserContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues: () => xhr.getSiteData(siteId)
	});

	const submitForm = form.handleSubmit((data) => xhr.updateSiteData(siteId, data.content)
		.then(() => alert('העמוד נשמר בהצלחה!'))
		.catch(() => alert('אירעה שגיאה בעת שמירת העמוד. המידע נשמר אך העמוד לא התעדכן - צרו עימנו קשר בהקדם')));

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// get theme name from form values, capitalize first letter
	const themeName = ((lowerCaseName) => (lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1)))(form.getValues().theme);

	return <FormProvider {...form}>
		<div className='is-flex' style={{ height: '100%' }}>
			<div style={{ minWidth: '25rem', width: 'min-content', height: '100%', overflowY: 'auto' }}>
				<Section noTopMargin className='is-small py-3' style={{ minHeight: '10rem' }}>
					<div className='has-strong-radius'>
						<ThemeFields fieldGroupName={themeName} submitForm={submitForm} />
					</div>
				</Section>
			</div>
			<div className='p-3' style={{ width: '100%' }}>
				<Preview />
				{/* <pre style={{ direction: 'ltr' }}>{JSON.stringify(form.getValues(), null, 2)}</pre> */}
			</div>
		</div>
	</FormProvider>;
}