import { Suspense, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import { useFieldLabels } from '@hooks/use-i18n';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import { AuthContext } from './Auth';
import TopBanner from './TopBanner';

import { fieldsMap } from '@themes';
import { EditorContext } from '@pages/Editor';

import { innerFieldsContainer, saveButtonContainer } from './index.module.sass';

export default function ThemeFields() {

	const t = useFieldLabels();
	const { siteId } = useContext(AuthContext);
	const { dir: { forward, backward } } = useContext(EditorContext);
	const { handleSubmit, getValues, formState: { errors } } = useFormContext();

	const [isLoading, setLoading] = useState(false);

	const [savedSuccessfullyModal, showSavedSuccessfullyModal] = useSuccessModal();
	const [errorWhileSavingModal, showErrorWhileSavingModal] = useErrorModal();

	useEffect(() => {
		// clear all error indicators
		document.querySelectorAll('details[has-errors]').forEach((elem) => elem.removeAttribute('has-errors'));
		// look for current elements with errors and set their parent details elem to indicate errors
		findElems(errors).forEach((elem) => elem.closest('details').setAttribute('has-errors', true));
	});

	const submitForm = handleSubmit((data) => {
		setLoading(true);
		xhr.updateSiteData(siteId, data)
			.then(() => showSavedSuccessfullyModal())
			.catch(() => showErrorWhileSavingModal())
			.finally(() => setLoading(false));
	});

	const FieldGroup = fieldsMap[getValues().theme];
	const hasErrors = !!Object.keys(errors).length;

	const submitClassName = classNames('button is-primary is-fullwidth is-justify-content-center has-text-weight-bold', isLoading && 'is-loading');

	return <>
		<Suspense fallback={<Loader />}>
			<div className={innerFieldsContainer} style={{ direction: backward }}>
				<div style={{ direction: forward }}>
					<TopBanner className="mb-3" />
					<FieldGroup />
				</div>
			</div>
			<div className={saveButtonContainer}>
				<button onClick={submitForm} disabled={hasErrors || isLoading} title={hasErrors ? t.errors_are_red : ''} className={submitClassName}>
					{t.submit}
				</button>
			</div>
		</Suspense>

		<Modal {...savedSuccessfullyModal} render={() => t.page_successfully_saved} />
		<Modal {...errorWhileSavingModal} render={() => t.page_failed_saving} />
	</>;
}

function findElems (obj) {
	const found = [];

	iterate(obj);

	return found;

	function iterate (obj) {
		Object.entries(obj).forEach(([, value]) => {
			if (value instanceof HTMLElement) found.push(value);
			else if (typeof value === 'object') iterate(value);
		});
	}

}