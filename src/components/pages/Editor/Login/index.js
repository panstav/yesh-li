import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Section from '@wrappers/Section';

import xhr from '@services/xhr';
import useFetch from '@hooks/use-fetch';
import useI18n from '@hooks/use-i18n';

import EmailForm from './EmailForm';
import VerificationForm from './VerificationForm';

import { loginWrapper } from '../index.module.sass';

export default function Login({ jwtExpired }) {

	const [{ Login: t, multi: { Logo: MultiLogo } }] = useI18n();

	const enterEmailForm = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isTried, setIsTried] = useState(false);
	const [isLinkSentHidden, setIsLinkSentHidden] = useState(false);
	const hideLinkSent = () => setIsLinkSentHidden(true);

	const [postEmailToLogin, isSentSuccessfully, isFailedSending] = useFetch(async (data) => {
		setIsTried(true);
		setIsLoading(true);
		return xhr.sendLoginEmail(data)
			.then(() => setIsLoading(false));
	}, enterEmailForm);

	const emailAddress = enterEmailForm.getValues('email');
	const providerUrl = emailAddress && `https://${emailAddress.split('@')[1]}`;

	const buttonClassName = "button block is-primary is-justify-content-center is-fullwidth has-text-white has-text-weight-bold mt-4";

	return <>
		<div className={loginWrapper}>
			<div className='has-background-primary w-100' style={{ margin: 'auto', filter: 'blur(100px)', borderRadius: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', height: '750px', opacity: '0.1', zIndex: '-10' }} />
			<Section className='is-medium mt-0'>
				<div className='has-text-centered mb-6'>
					<MultiLogo style={{ width: '4rem' }} />
					{jwtExpired && <p className='is-size-7 has-text-grey mt-2'>{t.session_over_please_reconnect}</p>}
				</div>
				<div className='has-background-white has-strong-radius py-5 px-4'>
					<h2 className='is-size-4 has-text-centered mb-5'>{t.connect}</h2>

					{!isSentSuccessfully && <EmailForm {...{
						form: enterEmailForm, onSubmit: postEmailToLogin,
						isLoading, isTried,
						buttonClassName
					}} />}

					{isFailedSending && <div className="notification has-text-centered has-background-warning-light p-4"></div>}
					{isSentSuccessfully && <>
						<VerificationForm email={emailAddress} buttonClassName={buttonClassName} onChange={hideLinkSent} />
						{!isLinkSentHidden && <div className="notification has-text-centered has-background-success-light p-4">{t.link_successfully_sent_to} <a href={providerUrl} className='has-text-weight-bold'>{enterEmailForm.getValues('email')}</a></div>}
					</>}
				</div>

			</Section>
		</div>
	</>;

}