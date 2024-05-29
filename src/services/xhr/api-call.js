import ky from 'ky';

import localDb from '@services/localDb';

let parentDomain;
const apiUrl = process.env.GATSBY_API_URL;

export const get = transformApiCall('get');
export const post = transformApiCall('post');
export const put = transformApiCall('put');
export const patch = transformApiCall('patch');
export const del = transformApiCall('delete');

// a function that return a function that calls ky with the method given to the first function
function transformApiCall(method) {

	// eslint-disable-next-line no-param-reassign
	if (method === 'del') method = 'delete';

	return (endpoint, data, optionsExtension = {}) => {

		// yl:domain meta tag should be available on all pages, rendered by the server
		// if it isn't available, it's because we're in development and the meta tag wasn't rendered yet
		// in that case, we'll get the parent domain from the global object, as on development it is set by one of the top-most components
		if (!parentDomain) {
			const parentDomainUrl = document.head.querySelector('[name="yl:domain"]')?.getAttribute('content');
			parentDomain = parentDomainUrl ? new URL(parentDomainUrl).hostname : window.parentDomain;
		}

		const headers = {
			yl_domain: parentDomain
		};

		const jwt = localDb.get('jwt');
		if (jwt) headers.Authorization = `Bearer ${jwt}`;

		const options = {
			json: data,
			headers,
			...optionsExtension
		};

		if (data && 'formData' in data) {
			if (Object.keys(data).length > 1) throw new Error(`Cannot send both formdata and json, found extra keys: ${Object.keys(data).filter((key) => key !== 'formData').join(', ')}`);

			// we're sending a file, don't stringify the data, formdata cannot be sent with json
			delete options.json;
			options.body = data.formData;
		}

		return new Promise((resolve, reject) => {
			return ky[method](`${apiUrl}/${endpoint}`, options).json()
				.then(resolve)
				.catch(async (err) => {
					console.error(err);
					err.responseData = await err.response?.json();
					reject(err);
				});
		});
	};
}