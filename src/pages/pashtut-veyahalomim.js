import Meta from '@config/Meta';

import PashtutVeYahalomimPage from '@pages/PashtutVeYahalomim';
export default PashtutVeYahalomimPage;

export const Head = ({ location: { pathname } }) => {
	return <Meta
		{...PashtutVeYahalomimPage.config}
		pathname={pathname}
	/>;
};