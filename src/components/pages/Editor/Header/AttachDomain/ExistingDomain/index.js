import { useContext, useState } from "react";

import xhr from "@services/xhr";

import useI18n from "@hooks/use-i18n";

import Loader from "@elements/Loader";
import { AuthContext } from "@pages/Editor/Auth";

import Component from "./ExistingDomain";

export default function ExistingDomain({ wrapper, contactUs, onSuccess, currentSlug }) {

	const [{ Editor: { AttachDomain: t } }] = useI18n();
	const { siteId } = useContext(AuthContext);

	const [domain, setDomain] = useState('');

	const [isGettingNameServers, setIsGettingNameServers] = useState(false);
	const [isValidatingNameServers, setIsValidatingNameServers] = useState(false);

	const [requiredNameServers, setRequiredNameServers] = useState();
	const [currentNameServers, setCurrentNameServers] = useState();

	const existingDomainForm = {
		onSubmit,
		shouldUseNativeValidation: false
	};

	// user entered a domain and we're waiting for the response
	if (isGettingNameServers) return <>
		<div className="is-relative" style={{ height: '8rem' }}>
			<Loader />
		</div>
		<p>{t.attaching_domain_wait_or_come_later}</p>
	</>;

	const props = {
		existingDomainForm,
		requiredNameServers,
		currentNameServers,
		validateNameServers,
		isValidatingNameServers,
		contactUs,
		wrapper
	};

	return Component(props);

	async function onSubmit(data) {
		const domain = normalizeUrl(data.domain);
		setDomain(domain);
		setIsGettingNameServers(true);
		const { dnsServers } = await xhr.createTempRootSite(domain);
		setIsGettingNameServers(false);
		setRequiredNameServers(dnsServers);
	}

	async function validateNameServers() {
		setIsValidatingNameServers(true);

		const data = await xhr.validateNameServers({
			domain,
			siteId,
			currentSlug,
			nameServers: requiredNameServers
		});

		setIsValidatingNameServers(false);
		if (data.isValid) return onSuccess(domain);
		// if current name servers don't match required name servers, we'll show the user the current name servers
		setCurrentNameServers(data.currentNameServers);
	}

}

function normalizeUrl(input) {
	// we'd like a url in the format of 'example.com'
	try {
		// user might have entered 'https://www.example.com' or 'http://example.com'
		const url = new URL(input);
		return url.hostname;
	} catch (error) {
		// URL won't accept even 'www.example.com', so we'll just make sure input url is without 'www.'
		return input.replace('www.', '');
	}
}