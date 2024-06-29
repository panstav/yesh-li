// test parseSrcSet for variations of srcSet strings
import parseSrcSet from './parse-srcset';

it('should parse a srcSet string into an array of srcs', () => {
	expect(parseSrcSet('https://example.com/image-1.jpg 1x, https://example.com/image-2.jpg 2x')).toEqual([
		'https://example.com/image-1.jpg',
		'https://example.com/image-2.jpg'
	]);
});

it('should put the smaller src first', () => {
	expect(parseSrcSet('https://example.com/image-1.jpg 2x, https://example.com/image-2.jpg 1x')).toEqual([
		'https://example.com/image-2.jpg',
		'https://example.com/image-1.jpg'
	]);

	expect(parseSrcSet('https://example.com/image-2.jpg 1x, https://example.com/image-1.jpg 2x')).toEqual([
		'https://example.com/image-2.jpg',
		'https://example.com/image-1.jpg'
	]);
});