export default {
	snakeCase: /^[a-z0-9_]+$/,

	israeliTelephone: /^\+972\d{8,9}$/,

	email: /\S+@\S+\.\S+/,

	domain: /^(http:\/\/|https:\/\/)?(www.)?[a-zA-Z-0-9]+\.[a-zA-Z-0-9]+(\.[a-zA-Z-0-9]*)?$/,

	slug: /^[a-zA-Z0-9]+[a-zA-Z-0-9]+[a-zA-Z0-9]+$/,

	firstDigit: /[0-9]{1}/,
	first4Digits: /[0-9]{4}/
};