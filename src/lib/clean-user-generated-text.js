export default function cleanUGT (str) {
	return str.replace(/\s+\./g, '. ').replace(/\s+,/g, ', ').replace(/\s+/g, ' ').trim();
}