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
import Footer from './Footer';
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

	const previewContainerClassName = classNames('p-3', previewContainer);
	const fieldsContainerClassName = classNames('is-flex is-flex-direction-column is-justify-content-space-between pb-3', fieldsContainer);

	return <>

		<FormProvider {...form}>
			<Header />
			<div className='is-flex-desktop'>
				<div className={fieldsContainerClassName}>
					<ThemeFields />
				</div>
				<div className={previewContainerClassName}>
					<Preview />
				</div>
			</div>
			<Footer />
		</FormProvider>

		<Modal {...newPageModal} render={() => <>
			<p>העמוד שלך מוכן!</p>
			<div className='is-size-6 has-text-start mt-4 mb-5'>
				<p>במסך זה אפשר להעשיר את העמוד בפרטים ומאפיינים נוספים ותוך כדי לראות בתצוגה המקדימה את האופן בו הם מוצגים בעמוד.</p>
				<p className='mt-3'>שימו לב: חלקים בעמוד שלך (כפתורים ושדות מסויימים) עלולים להראות בלתי פעילים בתצוגה המקדימה. כל אלה יפעלו בהתאם לאחר שתוציאו את העמוד האור.</p>
			</div>
			<p className='has-text-weight-bold'>המון הצלחה!</p>
		</>} />

	</>;
}