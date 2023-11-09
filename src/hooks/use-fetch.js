import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useFetch(apiFn, form) {

	if (!form) form = useFormContext();
	const handleSubmit = form.handleSubmit || ((fn) => (data) => fn(data));

	const [state, setState] = useState({});

	return [handleSubmit(callApiFn), !!state.isSuccess, !!state.isError, state];

	function callApiFn(data) {

		setState({});
		form.clearErrors();

		return apiFn(data)
			.then((res = {}) => {
				res.isSuccess = true;
				setState(res);
			})
			.catch((err) => {
				err.isError = true;
				setState(err);
				form.setError('root.serverError', err);
			});
	}

}