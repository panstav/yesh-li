export default function cleanUGT (str) {
	return str
		// ensure that dots are followed by a space instead of the other way around
		.replace(/\s+\./g, '. ')
		// ensure that commas are followed by a space instead of the other way around
		.replace(/\s+,/g, ', ')
		// ensure that a space is not followed by another space
		.replace(/\s+/g, ' ')
		// Remove all attributes from any HTML tags
		.replace(/\s*\S*="[^"]+"\s*/gm, "")
		// Remove spaces from the beginning and end of the string
		.trim();
}