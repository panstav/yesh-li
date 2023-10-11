import { createContext, createElement } from 'react';

export const PageContext = createContext();

export default function Page({ pageContext, background, children }) {

	const mainColor = pageContext?.content?.mainColor;

	return <PageContext.Provider value={pageContext}>
		<CssVariables {...{ mainColor }} />
		<Background {...{ background }} />
		{children}
		<div id="modal-root" />
	</PageContext.Provider>;
}

export function wrapPageElement({ element, props }) {
	return createElement(Page, { ...element.type.config, ...props }, element);
}

function Background({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}

function CssVariables({ mainColor, mainShade = '400' }) {
	// avoid printing css variables if main one instead available
	if (!mainColor) return null;

	return <style>
		{`:root {${variables()}}`}
	</style>;

	function variables() {
		return `
		accent-color: var(--color-primary);
		--color-primary-50: var(--color-${mainColor}-50);
		--color-primary-100: var(--color-${mainColor}-100);
		--color-primary-200: var(--color-${mainColor}-200);
		--color-primary-300: var(--color-${mainColor}-300);
		--color-primary-400: var(--color-${mainColor}-400);
		--color-primary-500: var(--color-${mainColor}-500);
		--color-primary-600: var(--color-${mainColor}-600);
		--color-primary-700: var(--color-${mainColor}-700);
		--color-primary-800: var(--color-${mainColor}-800);
		--color-primary-900: var(--color-${mainColor}-900);
		--color-primary: var(--color-primary-${mainShade});
		--color-black: #000000;
		--color-white: #FFFFFF;
		--color-gray-50: #F7FAFC;
		--color-gray-100: #EDF2F7;
		--color-gray-200: #E2E8F0;
		--color-gray-300: #CBD5E0;
		--color-gray-400: #A0AEC0;
		--color-gray-500: #718096;
		--color-gray-600: #4A5568;
		--color-gray-700: #2D3748;
		--color-gray-800: #1A202C;
		--color-gray-900: #171923;
		--color-gray: var(--color-gray-${mainShade});
		--color-red-50: #FFF5F5;
		--color-red-100: #FED7D7;
		--color-red-200: #FEB2B2;
		--color-red-300: #FC8181;
		--color-red-400: #F56565;
		--color-red-500: #E53E3E;
		--color-red-600: #C53030;
		--color-red-700: #9B2C2C;
		--color-red-800: #822727;
		--color-red-900: #63171B;
		--color-red: var(--color-red-${mainShade});
		--color-orange-50: #FFFAF0;
		--color-orange-100: #FEEBC8;
		--color-orange-200: #FBD38D;
		--color-orange-300: #F6AD55;
		--color-orange-400: #ED8936;
		--color-orange-500: #DD6B20;
		--color-orange-600: #C05621;
		--color-orange-700: #9C4221;
		--color-orange-800: #7B341E;
		--color-orange-900: #652B19;
		--color-orange: var(--color-orange-${mainShade});
		--color-yellow-50: #FFFFF0;
		--color-yellow-100: #FEFCBF;
		--color-yellow-200: #FAF089;
		--color-yellow-300: #F6E05E;
		--color-yellow-400: #ECC94B;
		--color-yellow-500: #D69E2E;
		--color-yellow-600: #B7791F;
		--color-yellow-700: #975A16;
		--color-yellow-800: #744210;
		--color-yellow-900: #5F370E;
		--color-yellow: var(--color-yellow-${mainShade});
		--color-green-50: #F0FFF4;
		--color-green-100: #C6F6D5;
		--color-green-200: #9AE6B4;
		--color-green-300: #68D391;
		--color-green-400: #48BB78;
		--color-green-500: #38A169;
		--color-green-600: #2F855A;
		--color-green-700: #276749;
		--color-green-800: #22543D;
		--color-green-900: #1C4532;
		--color-green: var(--color-green-${mainShade});
		--color-teal-50: #E6FFFA;
		--color-teal-100: #B2F5EA;
		--color-teal-200: #81E6D9;
		--color-teal-300: #4FD1C5;
		--color-teal-400: #38B2AC;
		--color-teal-500: #319795;
		--color-teal-600: #2C7A7B;
		--color-teal-700: #285E61;
		--color-teal-800: #234E52;
		--color-teal-900: #1D4044;
		--color-teal: var(--color-teal-${mainShade});
		--color-blue-50: #ebf8ff;
		--color-blue-100: #bee3f8;
		--color-blue-200: #90cdf4;
		--color-blue-300: #63b3ed;
		--color-blue-400: #4299e1;
		--color-blue-500: #3182ce;
		--color-blue-600: #2b6cb0;
		--color-blue-700: #2c5282;
		--color-blue-800: #2a4365;
		--color-blue-900: #1A365D;
		--color-blue: var(--color-blue-${mainShade});
		--color-cyan-50: #EDFDFD;
		--color-cyan-100: #C4F1F9;
		--color-cyan-200: #9DECF9;
		--color-cyan-300: #76E4F7;
		--color-cyan-400: #0BC5EA;
		--color-cyan-500: #00B5D8;
		--color-cyan-600: #00A3C4;
		--color-cyan-700: #0987A0;
		--color-cyan-800: #086F83;
		--color-cyan-900: #065666;
		--color-cyan: var(--color-cyan-${mainShade});
		--color-purple-50: #FAF5FF;
		--color-purple-100: #E9D8FD;
		--color-purple-200: #D6BCFA;
		--color-purple-300: #B794F4;
		--color-purple-400: #9F7AEA;
		--color-purple-500: #805AD5;
		--color-purple-600: #6B46C1;
		--color-purple-700: #553C9A;
		--color-purple-800: #44337A;
		--color-purple-900: #322659;
		--color-purple: var(--color-purple-${mainShade});
		--color-pink-50: #FFF5F7;
		--color-pink-100: #FED7E2;
		--color-pink-200: #FBB6CE;
		--color-pink-300: #F687B3;
		--color-pink-400: #ED64A6;
		--color-pink-500: #D53F8C;
		--color-pink-600: #B83280;
		--color-pink-700: #97266D;
		--color-pink-800: #702459;
		--color-pink-900: #521B41;
		--color-pink: var(--color-pink-${mainShade});
	`.trim();
	}

}