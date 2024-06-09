import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Modal, { useErrorModal, useSuccessModal } from '@wrappers/Modal';

import { useFieldLabels } from '@hooks/use-i18n';

import xhr from '@services/xhr';
import markErrorOnClosestDetails from '@lib/mark-error-on-closest-details';

import { themeFieldsMap } from '@themes';
import { domainFieldsMap } from '@domains';
import { EditorContext, tempIds } from '@pages/Editor';
import { AuthContext } from '@pages/Editor/Auth';

import Component from './ThemeFields';

export default function ThemeFields() {

	const t = useFieldLabels();
	const { siteId } = useContext(AuthContext);
	const { domainControl } = useContext(EditorContext);
	const { handleSubmit, getValues, formState: { errors } } = useFormContext();

	const [isLoading, setLoading] = useState(false);

	const [savedSuccessfullyModal, showSavedSuccessfullyModal] = useSuccessModal();
	const [errorWhileSavingModal, showErrorWhileSavingModal] = useErrorModal();

	useEffect(() => {
		// clear all error indicators
		document.querySelectorAll('details[data-has-errors]').forEach((elem) => elem.removeAttribute('data-has-errors'));
		// look for current elements with errors and set their parent details elem to indicate errors
		findElems(errors).forEach((elem) => markErrorOnClosestDetails(elem));
	});

	const onSubmit = handleSubmit((data) => {
		removeTempIds(data);
		setLoading(true);
		(domainControl ? xhr.updateDomainData(data) : xhr.updateSiteData(siteId, data))
			.then(() => showSavedSuccessfullyModal())
			.catch(() => showErrorWhileSavingModal())
			.finally(() => setLoading(false));
	});

	const FieldGroup = domainControl
		? domainFieldsMap[getValues().domain]
		: themeFieldsMap[getValues().theme];

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

function removeTempIds (data) {
	iterate(data);
	function iterate(obj) {
		Object.keys(obj).forEach((key) => {
			if (key === tempIds.key) delete obj[key];
			else if (typeof obj[key] === 'object') iterate(obj[key]);
		});
	}

}