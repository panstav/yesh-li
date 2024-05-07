import regexes from '@lib/regexes';

describe('snakeCase', () => {
	it('should match a string that contains only lowercase letters, numbers, and underscores', () => {
		expect(regexes.snakeCase.test('hello_world')).toBe(true);
		expect(regexes.snakeCase.test('helloWorld')).toBe(false);
		expect(regexes.snakeCase.test('HelloWorld')).toBe(false);
		expect(regexes.snakeCase.test('hello world')).toBe(false);
		expect(regexes.snakeCase.test('hello-world')).toBe(false);
	});
});

describe('israeliTelephone', () => {

	it('should match a string that starts with +972 and has 8-9 digits', () => {
		expect(regexes.israeliTelephone.test('+972501234567')).toBe(true);
		expect(regexes.israeliTelephone.test('+97212345789')).toBe(true);
		expect(regexes.israeliTelephone.test('+9721234567')).toBe(false);
		expect(regexes.israeliTelephone.test('+9721234567890')).toBe(false);
		expect(regexes.israeliTelephone.test('12345678')).toBe(false);
	});

	it('should not match numbers that do not start with +972 even if they are valid Israeli numbers', () => {
		expect(regexes.israeliTelephone.test('0541111111')).toBe(false);
	});

});

describe('email', () => {
	it('should match a string that contains an @ and a .', () => {
		expect(regexes.email.test('name@example.com')).toBe(true);
		expect(regexes.email.test('name@example')).toBe(false);
		expect(regexes.email.test('name.com')).toBe(false);
		expect(regexes.email.test('name@example.')).toBe(false);
		expect(regexes.email.test('name@.com')).toBe(false);
		expect(regexes.email.test('@example.com')).toBe(false);
		expect(regexes.email.test('name @example.com')).toBe(false);
	});
});

describe('domain', () => {
	it('should match a string that starts with http:// or https:// followed by an optional www., followed by a domain name, followed by a TLD', () => {
		expect(regexes.domain.test('http://www.example.com')).toBe(true);
		expect(regexes.domain.test('https://www.example.com')).toBe(true);
		expect(regexes.domain.test('https://example.com')).toBe(true);
		expect(regexes.domain.test('http://example.com')).toBe(true);
		expect(regexes.domain.test('www.example.com')).toBe(true);
		expect(regexes.domain.test('example.com')).toBe(true);
		expect(regexes.domain.test('http://example.co.il')).toBe(true);

		expect(regexes.domain.test('http:/example.com')).toBe(false);
		expect(regexes.domain.test('https//example.com')).toBe(false);
		expect(regexes.domain.test('http://example')).toBe(false);
		expect(regexes.domain.test('http://example.')).toBe(false);
		expect(regexes.domain.test('http://.com')).toBe(false);
		expect(regexes.domain.test('http://.')).toBe(false);
	});
});

describe('slug', () => {
	it('should match a string that contains only dashes, letters and numbers', () => {
		expect(regexes.slug.test('helloWorld')).toBe(true);
		expect(regexes.slug.test('hello-world')).toBe(true);
		expect(regexes.slug.test('hello-world-123')).toBe(true);

		expect(regexes.slug.test('hello_world')).toBe(false);
		expect(regexes.slug.test('hello world')).toBe(false);
		expect(regexes.slug.test('hello-world-')).toBe(false);
		expect(regexes.slug.test('-helloworld')).toBe(false);
		expect(regexes.slug.test('hello-world!')).toBe(false);
	});
});

describe('firstDigit', () => {
	it('should extract the first digit of a string', () => {
		expect(regexes.firstDigit.exec('123456')[0]).toBe('1');
		expect(regexes.firstDigit.exec('a123456')[0]).toBe('1');
	});
});
describe('first4Digits', () => {
	it('should extract the first 4 digits of a string', () => {
		expect(regexes.first4Digits.exec('123456')[0]).toBe('1234');
		expect(regexes.first4Digits.exec('a123456')[0]).toBe('1234');
	});
});

describe('startsWithVowel', () => {
	it('should match a string that starts with a vowel', () => {
		expect(regexes.startsWithVowel.test('apple')).toBe(true);
		expect(regexes.startsWithVowel.test('Apple')).toBe(true);
		expect(regexes.startsWithVowel.test('orange')).toBe(true);
		expect(regexes.startsWithVowel.test('Orange')).toBe(true);
		expect(regexes.startsWithVowel.test('ice')).toBe(true);
		expect(regexes.startsWithVowel.test('Ice')).toBe(true);
		expect(regexes.startsWithVowel.test('ear')).toBe(true);
		expect(regexes.startsWithVowel.test('Ear')).toBe(true);

		expect(regexes.startsWithVowel.test('banana')).toBe(false);
		expect(regexes.startsWithVowel.test('Banana')).toBe(false);
		expect(regexes.startsWithVowel.test('pear')).toBe(false);
		expect(regexes.startsWithVowel.test('Pear')).toBe(false);
		expect(regexes.startsWithVowel.test('grape')).toBe(false);
		expect(regexes.startsWithVowel.test('Grape')).toBe(false);
		expect(regexes.startsWithVowel.test('kiwi')).toBe(false);
		expect(regexes.startsWithVowel.test('Kiwi')).toBe(false);
	});
});

describe('vimeoOrYoutubeVideoUrl', () => {
	it('should match a string that is a vimeo or youtube video URL', () => {
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://vimeo.com/123456')).toBe(true);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://www.vimeo.com/123456')).toBe(true);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://youtube.com/watch?v=123456')).toBe(true);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://www.youtube.com/watch?v=123456')).toBe(true);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://vimeo.com/123456/')).toBe(true);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://youtube.com/watch?v=123456/')).toBe(true);

		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://vimeo.com/')).toBe(false);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://youtube.com/watch?v=')).toBe(false);
		expect(regexes.vimeoOrYoutubeVideoUrl.test('https://youtube.com/1235')).toBe(false);
	});
});