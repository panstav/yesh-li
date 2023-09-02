import Meta from '@config/Meta';

import SlowPcPage from '@pages/SlowPc';
export default SlowPcPage;

export const Head = ({ location: { pathname } }) => {
	return <>
		<style>{`html { font-size: 22px !important; }`}</style>
		<Meta
			{...SlowPcPage.config}
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