import { FormProvider } from 'react-hook-form';
import classNames from 'classnames';

import Tooltip from '@wrappers/Tooltip';
import Checkbox from '@elements/Checkbox';
import Help from '@elements/Help';

import useI18n from '@hooks/use-i18n';

export default function EmailForm({ form, onSubmit, buttonClassName, isLoading, isTried }) {

	const [i18n, { Login: { SendLoginLinkButtonText, ...t } }] = useI18n();

	const submitClassName = classNames(buttonClassName, isLoading && 'is-loading');

	return <FormProvider {...form}>
		<form onSubmit={onSubmit}>

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
		</form>
	</FormProvider>;
}