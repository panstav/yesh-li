import ky from 'ky';

import localDb from '@services/localDb';

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

	return (endpoint, data) => {

		const jwt = localDb.get('jwt');
		const headers = jwt ? { 'Authorization': `Bearer ${jwt}` } : {};
		const options = { json: data, headers };

		if (data && 'formData' in data) {
			if (Object.keys(data).length > 1) throw new Error(`Cannot send both formdata and json, found extra keys: ${Object.keys(data).filter((key) => key !== 'formData').join(', ')}`);

			// we're sending a file, don't stringify the data, formdata cannot be sent with json
			delete options.json;
			options.body = data.formData;
		}

		return new Promise((resolve, reject) => {
			return ky[method](`${apiUrl}/${endpoint}`, options).json()
				.then(resolve)
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	};
}