import isUrl from "@lib/is-url";
import regexes from "@lib/regexes";

import { useFieldLabels } from "@hooks/use-i18n";

import TextInput from "./TextInput";

export { default } from "./TextInput";

export function UrlInput({ type = 'url', validate, includes, required, isRelative, ...props }) {
	const t = useFieldLabels();
	return <TextInput
		type={type}
		validate={{
			...validate,
			// only invalidate these if value is present, otherwise it's the required validator's responsibility
			incldues: (str) => (!includes || (!str || str.includes(includes))) || t.urlMissingOn(includes),
			isUrl: (str) => (!str || (isRelative ? isRelativeUrl(str) : isUrl(str))) || (isRelative ? t.invalid_relative_url : t.invalid_url)
		}}
		required={required}
		{...props} />;
}

export function TelInput(props) {
	const t = useFieldLabels();
	return <TextInput
		type='tel'
		pattern={{ value: regexes.israeliTelephone, message: t.invalid_phone_number }}
		setValueAs={(str) => {
			const cleanStr = str.trim().replace(/-/g, '');
			// i18n might include a specific country code
			// replace any leading 0 with the country code if so
			return t.country_phone_code ? cleanStr.replace(/^0/, t.country_code) : cleanStr;
		}}
		{...props} />;
}

export function EmailInput(props) {
	const t = useFieldLabels();
	return <TextInput
		type="email"
		pattern={{ value: regexes.email, message: t.invalid_email }}
		{...props} />;
}

export function NumberInput(props) {
	return <TextInput
		type="number"
		setValueAs={(str) => String(Number(str))}
		{...props} />;
}

function isRelativeUrl(str) {
	return str.startsWith('/') && isUrl(`https://example.com${str}`);
}