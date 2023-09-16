export default function isUrl (str) {
	try {
		new URL(str);
		return true;
	} catch (err) {
		return false;
	}
}