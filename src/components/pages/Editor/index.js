import { navigate } from 'gatsby';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import xhr from '@services/xhr';

import Auth, { AuthContext } from './Auth';
import ThemeFields from './ThemeFieldGroups';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';

import { fieldsContainer, innerFieldsContainer, previewContainer } from './index.module.sass';

export default function Editor () {
	return <Auth>
		<EditorForm />
	</Auth>;
}

function EditorForm() {
	const { siteId } = useContext(AuthContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues: () => xhr.getSiteData(siteId)
	});

	const [savedSuccessfullyModal, showSavedSuccessfullyModal] = useSuccessModal();
	const [errorWhileSavingModal, showErrorWhileSavingModal] = useErrorModal();

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`${redirect}/editor`, { replace: true });

	const submitForm = form.handleSubmit((data) => xhr.updateSiteData(siteId, data.content)
		.then(() => showSavedSuccessfullyModal())
		.catch(() => showErrorWhileSavingModal())
	);

	const previewContainerClassName = classNames('p-3', previewContainer);
	const fieldsContainerClassName = classNames('p-3', fieldsContainer);
	const innerFieldsContainerClassName = classNames('has-strong-radius', innerFieldsContainer);

	// get theme name from form values, capitalize first letter
	const themeName = form.getValues().theme;

	return <>

		<FormProvider {...form}>
			<Header />
			<div className='is-flex-desktop mt-2'>
				<div className={fieldsContainerClassName}>
					<div className={innerFieldsContainerClassName}>
						<ThemeFields {...{ themeName, submitForm }} />
					</div>
				</div>
				<div className={previewContainerClassName}>
					<Preview />
				</div>
			</div>
			<Footer />
		</FormProvider>

		<Modal {...savedSuccessfullyModal} render={() => 'העמוד נשמר בהצלחה!'} />
		<Modal {...errorWhileSavingModal} render={() => 'אירעה שגיאה בעת שמירת העמוד. המידע נשמר אך העמוד לא התעדכן - צרו עימנו קשר בהקדם'} />

	</>;
}