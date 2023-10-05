import { navigate } from 'gatsby';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import Loader from '@elements/Loader';

import ThemeFields from './ThemeFieldGroups';
import Preview from './Preview';
import Header from './Header';
import Footer from './Footer';

import { UserContext } from '.';
import { fieldsContainer, innerFieldsContainer, previewContainer } from './index.module.sass';

export default function Editor () {

	const { sites: [siteId] } = useContext(UserContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues: () => xhr.getSiteData(siteId)
	});

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`${redirect}/editor`, { replace: true });

	const submitForm = form.handleSubmit((data) => xhr.updateSiteData(siteId, data.content)
		.then(() => alert('העמוד נשמר בהצלחה!'))
		.catch(() => alert('אירעה שגיאה בעת שמירת העמוד. המידע נשמר אך העמוד לא התעדכן - צרו עימנו קשר בהקדם')));

	const previewContainerClassName = classNames('p-3', previewContainer);
	const fieldsContainerClassName = classNames('p-3', fieldsContainer);
	const innerFieldsContainerClassName = classNames('has-strong-radius', innerFieldsContainer);

	// get theme name from form values, capitalize first letter
	const themeName = ((lowerCaseName) => (lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1)))(form.getValues().theme);

	return <FormProvider {...form}>
		<Header />
		<div className='is-flex-desktop mt-2'>
			<div className={fieldsContainerClassName}>
				<div className={innerFieldsContainerClassName}>
					<ThemeFields fieldGroupName={themeName} submitForm={submitForm} />
				</div>
			</div>
			<div className={previewContainerClassName}>
				<Preview />
				{/* <pre style={{ direction: 'ltr' }}>{JSON.stringify(form.getValues(), null, 2)}</pre> */}
			</div>
		</div>
		<Footer />
	</FormProvider>;
}