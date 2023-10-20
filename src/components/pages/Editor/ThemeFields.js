import { Suspense, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';
import Loader from '@elements/Loader';

import xhr from '@services/xhr';
import { fieldsMap } from '@themes/map';
import { AuthContext } from '@pages/Editor/Auth';
import copy from '@pages/Editor/copy';

export default function ThemeFields() {
	const { siteId } = useContext(AuthContext);
	const { watch, handleSubmit, getValues, formState: { errors } } = useFormContext();
	watch();

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
			<FieldGroup />
			<button onClick={submitForm} disabled={hasErrors || isLoading} title={hasErrors ? 'בעיות בעריכת העמוד מוצגות באדום' : ''} className={submitClassName}>{copy.submit}</button>
		</Suspense>

		<Modal {...savedSuccessfullyModal} render={() => 'העמוד נשמר בהצלחה!'} />
		<Modal {...errorWhileSavingModal} render={() => 'אירעה שגיאה בעת שמירת העמוד. המידע נשמר אך העמוד לא התעדכן - צרו עימנו קשר בהקדם'} />
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