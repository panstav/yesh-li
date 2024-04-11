import { navigate } from 'gatsby';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import snatchParameter from '@lib/snatch-parameter';

import useI18n from '@hooks/use-i18n';

import Modal, { useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import Header from './Header';
import ThemeFields from './ThemeFields';
import Preview from './Preview';
import Auth, { AuthContext } from './Auth';

import { fieldsContainer, previewContainer } from './index.module.sass';

export const editorProps = {
	isInternal: true
};

export default function Editor () {
	return <Auth>
		<EditorForm />
	</Auth>;
}

function EditorForm() {
	const [{ Editor: { NewPageModal } }] = useI18n();
	const { siteId } = useContext(AuthContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues: () => xhr.getSiteData(siteId)
	});

	const [newPageModal, showNewPageModal] = useSuccessModal();
	useEffect(() => {
		if (snatchParameter('newPage')) showNewPageModal();
	}, []);

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	// treat the redirect property as a domain
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`https://${redirect}/editor`, { replace: true });

	const fieldsContainerClassName = classNames('is-flex is-flex-direction-column is-justify-content-space-between', fieldsContainer);

	return <>

		<FormProvider {...form}>

			<Header />

			<div className='is-flex-desktop'>
				<div className={fieldsContainerClassName}>
					<ThemeFields />
				</div>
				<div className={previewContainer}>
					<Preview />
				</div>
			</div>
			{/* <Footer /> */}

		</FormProvider>

		<Modal {...newPageModal} render={NewPageModal} />

	</>;
}