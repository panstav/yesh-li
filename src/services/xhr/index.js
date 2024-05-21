import { get, post, put } from './api-call';

export default {

	// client-facing routes
	createLead: (lead) => post(`lead?slug=${location.pathname.substring(1)}`, { lead }),

	// auth
	getSession: () => get('session'),
	sendLoginEmail: ({ email, rememberMe }) => post('login-email', { email, rememberMe }),
	confirmLoginCode: ({ email, code }) => post('login-code-confirmation', { email, loginCode: code }),
	login: (loginCode) => post('session', { loginCode }),
	sendRegistrationEmail: (data) => post('email-verification', data),
	verifyCodeAndRegister: (code) => post('email-registration', { code }),

	// editor-facing routes
	getSiteData: (siteId) => get(`site-data?id=${siteId}`),
	processImage: ({ imageBase64, fileName, sizes, siteSlug, isFavicon, position }) => post(`image`, { imageBase64, fileName, sizes, siteSlug, isFavicon, position }, { timeout: false }),
	createYoutubeThumbnail: ({ videoUrl, siteId }) => post(`youtube-thumbnail`, { videoUrl, siteId }),
	updateSiteData: (siteId, data) => put(`site-data?siteId=${siteId}`, data),
	createTrial: (data) => post('trial', data, { timeout: false }),
	updateSlug: ({ slug, siteId }) => put('slug', { slug, siteId }),
	confirmSlugVacancy: (slug) => get(`slug-vacancy?slug=${slug}`),
	createTempRootSite: (domain) => post('temp-root-site', { domain }, { timeout: false }),
	validateNameServers: ({ domain, nameServers, siteId, currentSlug }) => get(`name-servers-validation?domain=${domain}&currentSlug=${currentSlug}&siteId=${siteId}&required=${nameServers.join(',')}`),

	// marketing-facing routes
	postEnquiry: (data) => post('enquiry', data)

};