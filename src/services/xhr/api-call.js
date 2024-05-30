import ky from 'ky';

import localDb from '@services/localDb';

let hostDomain, parentDomain;
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

		ensureYlVariables();

		const headers = {
			yl_parent_domain: parentDomain,
			yl_host_domain: hostDomain
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

function ensureYlVariables() {
	if (hostDomain && parentDomain) return;

	// yl meta tags should be available on all pages, as they're rendered server-side
	// if it isn't available, it's because we're in development and the meta tag renders client-side
	// in that case, we'll get the parent domain from the global object, as on development it is set by one of the top-most components
	hostDomain = document.head.querySelector('[name="yl:host_domain"]')?.getAttribute('content') || window.hostDomain;
	parentDomain = document.head.querySelector('[name="yl:parent_domain"]')?.getAttribute('content') || window.parentDomain;
}