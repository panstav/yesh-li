const allowedHtml = {
	'img': [{ attr: 'src', condition: isUrl }],
	'a': [{ attr: 'href', condition: isUrl }]
};
const allowedTags = Object.keys(allowedHtml);

// const res = cleanUGT('This is a <b>test</b> of the <a href="https://example.com" >emergency</a> broadcast system. <img src="https://example.com" /> This is only a test.');

export default function cleanUGT(str) {
	return str
		// ensure that dots are followed by a space instead of the other way around
		.replace(/\s+\./g, '. ')
		// ensure that commas are followed by a space instead of the other way around
		.replace(/\s+,/g, ', ')
		// ensure that a space is not followed by another space
		.replace(/\s+/g, ' ')
		// Remove all attributes from any HTML tags, except for the src attribute of an img tag
		.replace(/<[^>]+>/g, removeAllTagsExceptAllowedAttributes)
		// Remove spaces from the beginning and end of the string
		.trim();
}

function removeAllTagsExceptAllowedAttributes(tag) {

	let tagName;

	// if tag is not in the list of allowed tags - remove all its attributes
	if (!allowedTags.some((allowedTag) => {
		// assume tags that with no attributes are allowed
		const isAllowed = tag.includes(`<${allowedTag} `);
		// set allowedAttrs for this tag
		if (isAllowed) tagName = allowedTag;
		return isAllowed;

		// remove all its attributes, leave only the tag name and a space if it is a self-closing tag
	})) return tag.replace(/(?:\s*\S*="[^"]*"\s*)/gm, tag.includes('/>') ? ' ' : '');

	// tag is in the allowed list, go through all its attributes and remove the ones that are not allowed
	return tag.replace(/(?:\s*\S+="[^"]*")/gm, (attr) => {
		// attr is in the format of key="value" string with a space as a prefix

		let attrName;

		// if attr is a not in the allowed list
		if (!isAttrAllowed(attr)
			// or attr is empty
			|| attr.includes(` ${attrName}=""`)
			// or attr doesn't pass per-attribute validation
			|| !isValuePassingValidation(attr.slice(attr.indexOf('="') + 2, attr.length - 2))
		) return '';

		// src attr is valid
		return attr;

		function isAttrAllowed(attr) {
			return allowedHtml[tagName].some(({ attr: allowedAttr }) => {
				const attrNameIndex = attr.indexOf(` ${allowedAttr}="`);

				if (~attrNameIndex) {
					attrName = attr.slice(attrNameIndex + 1, attr.indexOf('='));
					return true;
				}
				return false;
			});
		}

		function isValuePassingValidation(attrValue) {
			return allowedHtml[tagName].find(({ attr: allowedAttr }) => allowedAttr === attrName).condition?.(attrValue);
		}

	});
}

function isUrl (str) {
	try {
		new URL(str);
		return true;
	} catch (e) {
		try {
			new URL(`${location.origin}${str}`);
		} catch (error) {
			return false;
		}
	}
}