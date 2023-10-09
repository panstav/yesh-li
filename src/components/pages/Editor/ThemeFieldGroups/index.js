import { Suspense, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Loader from '@elements/Loader';

import copy from '@pages/Editor/copy';

import map from './map';

export default function ThemeFields({ fieldGroupName, submitForm }) {
	const { watch, formState: { errors } } = useFormContext();
	watch();

	const FieldGroup = map[fieldGroupName];

	const hasErrors = !!Object.keys(errors).length;

	useEffect(() => {
		// clear all error indicators
		document.querySelectorAll('details[has-errors]').forEach((elem) => elem.removeAttribute('has-errors'));
		// look for current elements with errors and set their parent details elem to indicate errors
		findElems(errors).forEach((elem) => elem.closest('details').setAttribute('has-errors', true));
	});

	return <Suspense fallback={<Loader />}>
		<FieldGroup />
		<button onClick={submitForm} disabled={hasErrors} title={hasErrors ? 'בעיות בעריכת העמוד מוצגות באדום' : ''} className='button is-primary is-fullwidth is-justify-content-center has-text-weight-bold'>{copy.submit}</button>
	</Suspense>;
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