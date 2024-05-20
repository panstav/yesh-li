import getDirByLang from '@lib/get-dir-by-lang';

import Meta from '.';

export default function HeadFor(arg) {

	// this HOC will be used to either pass different props like this: HeadFor({ title: 'Homepage' })
	// or to use page data to pass props like this: HeadFor((data) => ({ title: data.pageContext.title }))
	return function Head(data) {

		let args;

		if (typeof (arg) === 'function') {
			args = arg(data);
		} else {
			args = arg;
		}

		const { lang = 'he', preload, fontSize = '18px', textColor, children, ...props } = args;

		const baseStyle = { fontSize };
		if (textColor) baseStyle.color = textColor;

		return <>
			<html lang={lang} dir={getDirByLang(lang)} style={baseStyle} />

			{preload && preload.map((preload) => <link rel="preload" key={preload.href} {...preload} />)}

			<Meta
				title={data.pageContext.title}
				mainColorName={data.pageContext.mainColor}
				{...props}
			/>

			{children}
		</>;
	};
}