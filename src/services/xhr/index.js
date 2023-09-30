import { get, post, put } from './api-call';

export default {

	// client-facing routes
	postLead: (lead) => post(`form-lead?slug=${location.pathname.substring(1)}`, { lead }),

	// auth
	getUserIdentity: () => get('user-identity'),
	postEmailToLogin: ({ email }) => post('login-link', { email }),
	getLoginCodeVerification: (loginCode) => get(`login-code-verification?loginCode=${loginCode}`),

	// editor-facing routes
	getSiteData: (siteId) => get(`site-data?id=${siteId}`),
	postImage: ({ imageBase64, fileName, sizes, siteId }) => post(`image`, { imageBase64, fileName, sizes, siteId }),
	updateSiteData: (siteId, content) => put(`site-data?siteId=${siteId}`, content),

};