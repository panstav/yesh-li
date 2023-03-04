import Meta from '@config/Meta';

import RetreatYetziraVeOtzmaPage from '@pages/RetreatYetziraVeOtzma';
export default RetreatYetziraVeOtzmaPage;

export const Head = ({ location: { pathname } }) => {
	return <Meta {...RetreatYetziraVeOtzmaPage.config} pathname={pathname} />;
};