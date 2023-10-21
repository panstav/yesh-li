import { navigate } from 'gatsby';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Loader from '@elements/Loader';
import xhr from '@services/xhr';

import Header from './Header';
import ThemeFields from './ThemeFields';
import Preview from './Preview';
import Footer from './Footer';
import Auth, { AuthContext } from './Auth';

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

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`${redirect}/editor`, { replace: true });

	const previewContainerClassName = classNames('p-3', previewContainer);
	const fieldsContainerClassName = classNames('p-3', fieldsContainer);
	const innerFieldsContainerClassName = classNames('has-strong-radius', innerFieldsContainer);

	return <FormProvider {...form}>
		<Header />
		<div className='is-flex-desktop mt-2'>
			<div className={fieldsContainerClassName}>
				<div className={innerFieldsContainerClassName}>
					<ThemeFields />
				</div>
			</div>
			<div className={previewContainerClassName}>
				<Preview />
			</div>
		</div>
		<Footer />
	</FormProvider>;
}