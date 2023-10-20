/**
 * Parses a srcSet string into an array of srcs
 * @param {string} srcSet - The srcSet string to parse
 * @returns {string[]} An array of srcs
 * @example
 * parseSrcSet('https://example.com/image-1.jpg 1x, https://example.com/image-2.jpg 2x')
 * // returns ['https://example.com/image-1.jpg', 'https://example.com/image-2.jpg']
 */

export default function parseSrcSet(srcSet) {
	return srcSet
		// split the srcSet into an array of "${srcs} ${size}w"
		.split(', ')
		// split each string into an array of [src, size]
		.map((src) => src.split(' '))
		// sort the array by size (ascending)
		.sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
		// return an array of the srcs only
		.map((src) => src[0]);
}