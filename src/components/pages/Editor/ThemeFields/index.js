import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import xhr from '@services/xhr';
import { useFieldLabels } from '@hooks/use-i18n';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';

import { fieldsMap } from '@themes';
import { AuthContext } from '@pages/Editor/Auth';

import Component from './ThemeFields';

export default function ThemeFields() {

	const t = useFieldLabels();
	const { siteId } = useContext(AuthContext);
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

	const onSubmit = handleSubmit((data) => {
		setLoading(true);
		xhr.updateSiteData(siteId, data)
			.then(() => showSavedSuccessfullyModal())
			.catch(() => showErrorWhileSavingModal())
			.finally(() => setLoading(false));
	});

	const FieldGroup = fieldsMap[getValues().theme];
	const hasErrors = !!Object.keys(errors).length;

	const props = {
		fieldGroup: FieldGroup,
		hasErrors,
		isLoading,
		onSubmit
	};

	return <>
		<Component {...props} />

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