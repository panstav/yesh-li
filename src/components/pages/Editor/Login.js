import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import Section from '@wrappers/Section';
import Tooltip from '@wrappers/Tooltip';
import Spacer from '@elements/Spacer';
import Checkbox from '@elements/Checkbox';

import xhr from '@services/xhr';
import useFetch from '@hooks/use-fetch';

import { help, isSmall, isMedium, isLarge } from './index.module.sass';

export default function Login() {
	const form = useForm();
	const [postEmailToLogin, isSuccess, isError] = useFetch(xhr.postEmailToLogin, form);

	return <>
		<Spacer />
		<div style={{ position: 'relative', marginTop: '8rem' }}>
			<div className='has-background-primary' style={{ margin: 'auto', filter: 'blur(100px)', borderRadius: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', width: '100%', height: '750px', opacity: '0.1', zIndex: '-10' }} />
			<Section className='is-medium'>
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

							<button className="button block is-justify-content-center is-fullwidth has-text-white has-text-weight-bold has-background-primary mt-4">שלח לי לינק התחברות</button>
							{isError && <div className="notification has-text-centered has-background-warning-light p-4">שגיאת מערכת, נסו שוב מאוחר יותר.</div>}
							{isSuccess && <div className="notification has-text-centered has-background-success-light p-4">יש! לינק התחברות נשלח בהצלחה ל- <span className='has-text-weight-bold'>{form.getValues('email')}</span></div>}
						</form>
					</FormProvider>
				</div>

			</Section>
		</div>
	</>;

}

function Help({ size }) {
	const className = classNames(help, { small: isSmall, medium: isMedium, large: isLarge }[size]);
	return <div className={className}>?</div>;
}