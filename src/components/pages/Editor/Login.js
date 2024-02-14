import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Section from '@wrappers/Section';
import Tooltip from '@wrappers/Tooltip';
import Spacer from '@elements/Spacer';
import Checkbox from '@elements/Checkbox';
import { Logo } from '@elements/Icon';
import Help from '@elements/Help';

import xhr from '@services/xhr';
import useFetch from '@hooks/use-fetch';


export default function Login() {

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

	return <>
		<Spacer />
		<div style={{ position: 'relative', marginTop: '6rem' }}>
			<div className='has-background-primary' style={{ margin: 'auto', filter: 'blur(100px)', borderRadius: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', width: '100%', height: '750px', opacity: '0.1', zIndex: '-10' }} />
			<Section className='is-medium'>
				<div className='has-text-centered mb-6'>
					<Logo style={{ width: '4rem' }} />
				</div>
				<div className='has-background-white has-strong-radius py-5 px-4'>
					<h2 className='is-size-4 has-text-centered mb-5'>התחברות</h2>
					<FormProvider {...form}>
						<form onSubmit={postEmailToLogin}>

							<div className="field">
								<label className="label" htmlFor="login-email">כתובת מייל:</label>
								<input className="input" type="email" id="login-email" autoComplete="email" {...form.register('email', { required: 'כתובת המייל שנרשמת איתה' })} />
							</div>

							<Checkbox
								id='rememberMe'
								label="זוכר אותי"
								besideLabel={<Tooltip content="אם זהו מכשיר פרטי אפשר להשאר מחוברים ליותר זמן" className="is-flex is-is-align-items-center ms-2"><Help size="small" /></Tooltip>} />

							<button className={submitClassName}>שלח לי {isTried ? 'עוד ' : ''}לינק התחברות</button>
							{isError && <div className="notification has-text-centered has-background-warning-light p-4">שגיאת מערכת, נסו שוב מאוחר יותר.</div>}
							{isSuccess && <div className="notification has-text-centered has-background-success-light p-4">יש! לינק התחברות נשלח בהצלחה ל- <span className='has-text-weight-bold'>{form.getValues('email')}</span></div>}
						</form>
					</FormProvider>
				</div>

			</Section>
		</div>
	</>;

}