import cleanUGT from "@lib/clean-user-generated-text";

it('should place a space after a dot, instead of the other way around', () => {
	expect(cleanUGT('Hello .World')).toBe('Hello. World');
});

it('should keep a dot if it has no space before or after', () => {
	expect(cleanUGT('Hello.World')).toBe('Hello.World');
});

it('should place a space after a comma, instead of the other way around', () => {
	expect(cleanUGT('Hello ,World')).toBe('Hello, World');
});

it('should place a space after a comma, even if there are multiple spaces before it', () => {
	expect(cleanUGT('Hello   ,World')).toBe('Hello, World');
});

it('should remove extra spaces', () => {
	expect(cleanUGT('Hello  World')).toBe('Hello World');
});

it('should remove attributes from HTML tags', () => {
	expect(cleanUGT('<div id="test">Hello World</div>')).toBe('<div>Hello World</div>');
});
it('should keep the src attribute on img tags', () => {
	const imgSrc = `https://example.com/test.jpg`;
	expect(cleanUGT(`<h1 style="" /><img src="${imgSrc}" alt="test">`)).toBe(`<h1 /><img src="${imgSrc}">`);
	expect(cleanUGT(`<img src="${imgSrc}" alt="test">`)).toBe(`<img src="${imgSrc}">`);
	expect(cleanUGT(`<imga src="${imgSrc}" alt="test">`)).toBe('<imga>');
	expect(cleanUGT(`<img srcSet="${imgSrc}" alt="test">`)).toBe('<img>');
});
it('should remove the src attribute if it is empty', () => {
	expect(cleanUGT('<img src="">')).toBe('<img>');
});

it('should remove spaces from the beginning and end of the string', () => {
	expect(cleanUGT('  Hello World  ')).toBe('Hello World');
});