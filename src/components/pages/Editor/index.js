import { navigate } from 'gatsby';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Modal, { useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';
import xhr from '@services/xhr';
import snatchParameter from '@lib/snatch-parameter';

import Header from './Header';
import ThemeFields from './ThemeFields';
import Preview from './Preview';
// import Footer from './Footer';
import Auth, { AuthContext } from './Auth';

import { fieldsContainer, previewContainer } from './index.module.sass';

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

	const [newPageModal, showNewPageModal] = useSuccessModal();
	useEffect(() => {
		if (snatchParameter('newPage')) showNewPageModal();
	}, []);

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`${redirect}/editor`, { replace: true });

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

		<Modal {...newPageModal} render={() => <>
			<p>העמוד שלך מוכן!</p>
			<div className='is-size-6 has-text-start mt-4 mb-5'>
				<p>במסך זה אפשר להעשיר את העמוד שלך בפרטים ומאפיינים נוספים. אלה שתבחרו יופיעו בתצוגה המקדימה של העמוד.</p>
				<p className='mt-3'>בתצוגה המקדימה - כפתורים ושדות מסויימים בעמוד שלך יהיו בלתי פעילים. בתצוגה למבקרים - כל אלה יפעלו כשורה אחרי שהעמוד ייצא לאור.</p>
			</div>
			<p className='has-text-weight-bold'>המון הצלחה!</p>
		</>} />

	</>;
}