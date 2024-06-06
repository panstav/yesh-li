import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import localDb from '@services/localDb';
import snatchParameter from '@lib/snatch-parameter';

import useI18n from '@hooks/use-i18n';

import Modal, { useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import Header from './Header';
import ThemeFields from './ThemeFields';
import Preview from './Preview';
import { AuthContext } from './Auth';

import { tempIds } from '.';
import { fieldsContainer, previewContainer } from './index.module.sass';

export default function Editor() {
	const [{ Editor: { NewPageModal } }] = useI18n();
	const { siteId } = useContext(AuthContext);

	const form = useForm({
		mode: 'onChange',
		defaultValues: getDefaultValues
	});

	const [newPageModal, showNewPageModal] = useSuccessModal();
	useEffect(() => {
		if (snatchParameter('newPage')) showNewPageModal();
	}, []);

	if (!form.formState.defaultValues) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	// treat the redirect property as a domain
	if (form.formState.defaultValues.redirect) return wrongDomain(form.formState.defaultValues.redirect);

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

	function wrongDomain(redirect) {
		// we should be loading the editor from the site's domain
		// lets delete the localstorage and redirect to the site's editor
		localDb.clear();
		// if user comes back here he'll be redirected again from the Login domain
		return window.location.replace(`https://${redirect}/editor`);
	}

	async function getDefaultValues() {
		const res = await xhr.getSiteData(siteId);
		tempIds.setAll(res);
		return res;
	}

}