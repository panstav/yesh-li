import Meta from '@config/Meta';

import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Process from './Process';
import CTA from './CTA';

import { PageContext } from './contexts';

const config = {
	title: 'טיפול 10000 למחשב',
	description: ['מחשב ותיק ואהוב', 'יכול לחזור לעבוד כמו חדש'],
	// description: 'פעם בשנה נותנים לכלים שלנו טיפול איכותי ונהנים מביצועים חלקים ומהירים.',
	featuredImage: 'https://storage.googleapis.com/yeshli-www/assets/background-02-clear.jpg',
	emailAddress: 'stavgeffen@gmail.com'
};

export const Head = ({ location: { pathname } }) => {
	return <>
		<style>{`html { font-size: 22px !important; }`}</style>
		<Meta
			{...config}
			pathname={pathname}
		/>
		<link rel="apple-touch-icon" sizes="180x180" href="https://storage.googleapis.com/yeshli-www/savviors/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="https://storage.googleapis.com/yeshli-www/savviors/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="https://storage.googleapis.com/yeshli-www/savviors/favicon-16x16.png" />
		<link rel="mask-icon" href="https://storage.googleapis.com/yeshli-www/savviors/safari-pinned-tab.svg" color="#5bbad5" />
		<link rel="shortcut icon" href="https://storage.googleapis.com/yeshli-www/savviors/favicon.ico" />
		<meta name="msapplication-TileColor" content="#00aba9" />
		<meta name="theme-color" content="#ffffff" />
	</>;
};

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

function Footer() {
	return <footer className='has-text-centered is-size-7 has-text-grey-lighter mt-6 pb-3'>
		סאוויורס © כל הזכויות שמורות {new Date().getFullYear()}
	</footer>;
}