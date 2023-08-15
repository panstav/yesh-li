import Meta from '@config/Meta';

import FromJunkToMagicPage from '@pages/FromJunkToMagic';
export default FromJunkToMagicPage;

export const Head = ({ location: { pathname } }) => {
	return <Meta
		{...FromJunkToMagicPage.config}
		pathname={pathname}
	/>;
};