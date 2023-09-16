// a master key is used to store all data in localstorage
const masterKey = 'yeshli';

const oldKeys = [];

deprecate();

export default { get, set, unset, clear };

function get(key) {
	if (!key) throw new Error('key is required');
	if (key.includes('.')) throw new Error('dot notation is not supported');

	const masterValue = localStorage.getItem(masterKey);
	if (!masterValue) {
		// initiate empty storage object if it doesn't exist
		localStorage.setItem(masterKey, JSON.stringify({}));
		return;
	}

	return JSON.parse(masterValue)[key];
}

function set(key, value) {
	if (typeof key !== 'string') throw new Error('key must be a string');
	if (!value) throw new Error('value is required');
	if (key.includes('.')) throw new Error('dot notation is not supported');

	const previousMasterValue = JSON.parse(localStorage.getItem(masterKey) || '{}');
	const newMasterValue = Object.assign({}, previousMasterValue, { [key]: value });
	localStorage.setItem(masterKey, JSON.stringify(newMasterValue));
}

function unset(key) {
	if (!key) throw new Error('key is required');
	if (key.includes('.')) throw new Error('dot notation is not supported');

	const masterValue = JSON.parse(localStorage.getItem(masterKey) || '{}');
	delete masterValue[key];
	localStorage.setItem(masterKey, JSON.stringify(masterValue));
}

function clear() {
	localStorage.removeItem(masterKey);
}

function deprecate() {
	oldKeys.forEach((key) => {
		const store = get(key);
		if (!store) return;
		clear();
	});
}