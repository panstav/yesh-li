import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Section from '@wrappers/Section';
import Tooltip from '@wrappers/Tooltip';
import Spacer from '@elements/Spacer';
import Checkbox from '@elements/Checkbox';
import Help from '@elements/Help';

import xhr from '@services/xhr';
import useFetch from '@hooks/use-fetch';
import useI18n from '@hooks/use-i18n';

import { loginWrapper } from './index.module.sass';

export default function Login({ jwtExpired }) {

	const [i18n, { Login: { SendLoginLinkButtonText, ...t }, multi: { Logo: MultiLogo } }] = useI18n();

	const form = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isTried, setIsTried] = useState(false);

	const [postEmailToLogin, isSuccess, isError] = useFetch(async (data) => {
		setIsTried(true);
		setIsLoading(true);
		return xhr.postEmailToLogin(data)
			.then(() => setIsLoading(false));
	}, form);

	const submitClassName = classNames("button block is-primary is-justify-content-center is-fullwidth has-text-white has-text-weight-bold mt-4", isLoading && 'is-loading');

	const emailAddress = form.getValues('email');
	const providerUrl = emailAddress && `https://${emailAddress.split('@')[1]}`;

	return <>
		<Spacer />
		<div className={loginWrapper}>
			<div className='has-background-primary w-100' style={{ margin: 'auto', filter: 'blur(100px)', borderRadius: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', height: '750px', opacity: '0.1', zIndex: '-10' }} />
			<Section className='is-medium'>
				<div className='has-text-centered mb-6'>
					<MultiLogo style={{ width: '4rem' }} />
					{jwtExpired && <p className='is-size-7 has-text-grey mt-2'>{t.session_over_please_reconnect}</p>}
				</div>
				<div className='has-background-white has-strong-radius py-5 px-4'>
					<h2 className='is-size-4 has-text-centered mb-5'>{t.connect}</h2>
					<FormProvider {...form}>
						<form onSubmit={postEmailToLogin}>

							<div className="field">
								<label className="label" htmlFor="login-email">{i18n.misc.email_address}:</label>
								<input className="input" type="email" id="login-email" autoComplete="email" {...form.register('email', { required: t.email_registered_with })} />
							</div>

							<Checkbox
								id='rememberMe'
								label={t.remember_me}
								besideLabel={<Tooltip content={t.why_remember_me} className="is-flex is-is-align-items-center ms-2"><Help size="small" /></Tooltip>} />

							<button className={submitClassName}>
								<SendLoginLinkButtonText isTried={isTried} />
							</button>
							{isError && <div className="notification has-text-centered has-background-warning-light p-4"></div>}
							{isSuccess && <div className="notification has-text-centered has-background-success-light p-4">{t.link_successfully_sent_to}<a href={providerUrl} className='has-text-weight-bold'>{form.getValues('email')}</a></div>}
						</form>
					</FormProvider>
				</div>

			</Section>
		</div>
	</>;

}