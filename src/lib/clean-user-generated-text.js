export default function cleanUGT (str) {
	return str.replaceAll(' .', '. ').replaceAll(' ,', ', ').replace(/\s+/g, ' ').trim();
}