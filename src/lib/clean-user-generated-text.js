export default function cleanUGT (str) {
	return str
		// ensure that dots are followed by a space instead of the other way around
		.replace(/\s+\./g, '. ')
		// ensure that commas are followed by a space instead of the other way around
		.replace(/\s+,/g, ', ')
		// ensure that a space is not followed by another space
		.replace(/\s+/g, ' ')
		// Remove all attributes from any HTML tags, except for the src attribute of an img tag
		.replace(/<[^>]+>/g, removeAllTagsExceptImgSrc())
		// Remove spaces from the beginning and end of the string
		.trim();
}

function removeAllTagsExceptImgSrc() {
	return (tag) => {
		if (!tag.includes('<img ')) return tag.replace(/(?:\s*\S*="[^"]*"\s*)/gm, tag.includes('/>') ? ' ' : '');
		return tag.replace(/(?:\s*\S*="[^"]+")/gm, (attr) => {
			if (!attr.includes(' src=')) return '';
			if (attr.includes(' src=""')) return '';
			return attr;
		});
	};
}
