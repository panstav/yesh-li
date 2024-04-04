import { get, post, put } from './api-call';

export default {

	// client-facing routes
	postLead: (lead) => post(`form-lead?slug=${location.pathname.substring(1)}`, { lead }),

	// auth
	getUserIdentity: () => get('user-identity'),
	postEmailToLogin: ({ email, rememberMe }) => post('login-link', { email, rememberMe }),
	getLoginCodeVerification: (loginCode) => get(`login-code-verification?loginCode=${loginCode}`),
	verifyEmail: (data) => post('email-verification', data),
	verifyEmailCode: (code) => post('email-verification-code', { code }),

	// editor-facing routes
	getSiteData: (siteId) => get(`site-data?id=${siteId}`),
	postImage: ({ imageBase64, fileName, sizes, siteSlug, isFavicon, position }) => post(`image`, { imageBase64, fileName, sizes, siteSlug, isFavicon, position }, { timeout: false }),
	postYoutubeThumbnail: ({ videoUrl, siteId }) => post(`youtube-thumbnail`, { videoUrl, siteId }),
	updateSiteData: (siteId, data) => put(`site-data?siteId=${siteId}`, data),
	createTrial: (data) => post('trial', data, { timeout: false }),
	updateSlug: ({ slug, siteId }) => put('slug', { slug, siteId }),
	checkSlugVacancy: (slug) => get(`slug-vacancy?slug=${slug}`),
	createTempRootSite: (domain) => post('temp-root-site', { domain }, { timeout: false }),
	validateNameServers: ({ domain, nameServers, siteId }) => get(`validate-name-servers?domain=${domain}&siteId=${siteId}&required=${nameServers.join(',')}`),

	// marketing-facing routes
	postEnquiry: (data) => post('enquiry', data)

};