import regexes from "@lib/regexes";

export default function slugify(str) {
	let res = str.toLowerCase().replace(regexes.nonSlugParts, '-');
	if (res.startsWith('-')) res = res.slice(1);
	if (res.endsWith('-')) res = res.slice(0, -1);
	return res;
}