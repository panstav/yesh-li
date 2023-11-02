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
	postImage: ({ imageBase64, fileName, sizes, siteSlug, isFavicon, position }) => post(`image`, { imageBase64, fileName, sizes, siteSlug, isFavicon, position }, { timeout: false }),
	postYoutubeThumbnail: ({ videoUrl, siteId }) => post(`youtube-thumbnail`, { videoUrl, siteId }),
	updateSiteData: (siteId, data) => put(`site-data?siteId=${siteId}`, data),
	createTrial: (data) => post('trial', data)

};