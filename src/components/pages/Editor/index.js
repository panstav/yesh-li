import { navigate } from 'gatsby';
import { useContext, useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';
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

	const [fatalErrorModalProps, showFatalErrorModal] = useErrorModal({ hideable: false });

	if (!Object.keys(form.getValues()).length) return <Loader />;

	// if the site has moved out to it's own domain, redirect to its editor page
	const redirect = form.getValues().redirect;
	if (redirect) return navigate(`${redirect}/editor`, { replace: true });

	const fieldsContainerClassName = classNames('is-flex is-flex-direction-column is-justify-content-space-between', fieldsContainer);

	return <>

		<FormProvider {...form}>

			<Header />

			<ErrorBoundary FallbackComponent={() => {}} onError={(error) => showFatalErrorModal({ error })}>
				<div className='is-flex-desktop'>
					<div className={fieldsContainerClassName}>
						<ThemeFields />
					</div>
					<div className={previewContainer}>
						<Preview />
					</div>
				</div>
				{/* <Footer /> */}
			</ErrorBoundary>

		</FormProvider>

		<Modal {...newPageModal} render={() => <>
			<p>העמוד שלך מוכן!</p>
			<div className='is-size-6 has-text-start mt-4 mb-5'>
				<p>במסך זה אפשר להעשיר את העמוד שלך בפרטים ומאפיינים נוספים. אלה שתבחרו יופיעו בתצוגה המקדימה של העמוד.</p>
				<p className='mt-3'>בתצוגה המקדימה - כפתורים ושדות מסויימים בעמוד שלך יהיו בלתי פעילים. בתצוגה למבקרים - כל אלה יפעלו כשורה אחרי שהעמוד ייצא לאור.</p>
			</div>
			<p className='has-text-weight-bold'>המון הצלחה!</p>
		</>} />

		<Modal {...fatalErrorModalProps} render={({ error }) => <>
			<div className='block content has-text-start mt-5'>
				<p>נתקלנו בשגיאת מערכת.<br />השגיאה שוגרה למערכת ותתוקן בהקדם האפשרי.</p>
				<p>ניתן לנסות לרענן את הדף ולנסות שוב. אם השגיאה חוזרת - כדאי לפנות לתמיכה.</p>
			</div>

			<div className='buttons has-addons is-centered'>
				<button className='button' onClick={() => window.location.reload()}>לרענן את הדף</button>
				<a className='button' href={`mailto:hello@yesh.li?subject=שגיאת מערכת ב-יש.לי&body=נתקלתי בשגיאה הזו:%0D%0A%0D%0A${error.stack.replaceAll('\n', '%0D%0A')}`} target="_blank" rel="noopener noreferrer">לפנות לתמיכה</a>
			</div>
		</>} />

	</>;
}