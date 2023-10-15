export default function copyToClipboard(text) {
	if (!text) return;

	const type = "text/plain";
	// eslint-disable-next-line no-undef
	const data = [new ClipboardItem({ [type]: new Blob([text], { type }) })];

	return navigator.clipboard.write(data);
}