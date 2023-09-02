import { createContext } from 'react';

import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Process from './Process';
import CTA from './CTA';

SlowPcPage.config = {
	title: 'טיפול 10000 למחשב',
	description: ['מחשב ותיק ואהוב', 'יכול לחזור לעבוד כמו חדש'],
	// description: 'פעם בשנה נותנים לכלים שלנו טיפול איכותי ונהנים מביצועים חלקים ומהירים.',
	featuredImage: 'https://storage.googleapis.com/yeshli-www/assets/background-02-clear.jpg',
	emailAddress: 'stavgeffen@gmail.com'
};

export const PageContext = createContext();

export default function SlowPcPage() {
	return <PageContext.Provider value={SlowPcPage.config}>
		<Header />
		<Hero />
		<Features />
		<Process />
		<CTA />
		{/* <Testimonials /> */}
		{/* <Article /> */}
		{/* <CTA /> */}
		{/* <About /> */}
		<Footer />
	</PageContext.Provider>;
}

export function SubtleHeader({ children }) {
	return <span className="has-text-blue-light">
		{children}
	</span>;
}

function Footer() {
	return <footer className='has-text-centered is-size-7 has-text-grey-lighter mt-6 pb-3'>
		סאוויורס © כל הזכויות שמורות {new Date().getFullYear()}
	</footer>;
}