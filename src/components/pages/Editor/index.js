import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import localDb from '@services/localDb';
import snatchParameter from '@lib/snatch-parameter';
import getDirByLang from '@lib/get-dir-by-lang';

import useI18n from '@hooks/use-i18n';

import Modal, { useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import Header from './Header';
import ThemeFields from './ThemeFields';
import Preview from './Preview';
import Auth, { AuthContext } from './Auth';

import { fieldsContainer, previewContainer } from './index.module.sass';

export const EditorContext = createContext();
export const editorProps = {
	isInternal: true
};

export default function Editor ({ pageContext }) {
	const { forward, backward } = getDirByLang(pageContext.lang, { bothSides: true });
	return <Auth>
		<EditorContextHandler extend={{ dir: { forward, backward } }}>
			<EditorForm  />
		</EditorContextHandler>
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

}

export function PreviewLink({ href, children }) {

	const goTo = useContext(EditorContext).navigate;

	return <a onClick={navigate}>{children}</a>;

	function navigate(event) {
		event.preventDefault();
		goTo(href);
	}

}

function EditorContextHandler({ extend, children }) {
	const [navigate, setNavigate] = useState();

	const registerNavigation = useCallback((navigationFn) => {
		if (!navigate) return setNavigate(() => navigationFn);
	}, [navigate]);

	const ctx = Object.assign({ navigate, registerNavigation }, extend);

	return <EditorContext.Provider value={ctx}>
		{children}
	</EditorContext.Provider>;

}