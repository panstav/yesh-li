import { useContext, useState } from "react";
import classNames from "classnames";

import xhr from "@services/xhr";
import useI18n from "@hooks/use-i18n";

import Form from "@wrappers/Form";
import UrlInputWithAddon from "@elements/Fields/UrlInputWithAddon";
import Loader from "@elements/Loader";
import { AuthContext } from "@pages/Editor/Auth";

export default function ExistingDomain({ wrapper: Wrapper, contactUs: ContactUs, onSuccess, currentSlug }) {

	const [i18n, { Editor: { AttachDomain: t } }] = useI18n();
	const { siteId } = useContext(AuthContext);

	const [domain, setDomain] = useState('');

	const [isGettingNameServers, setIsGettingNameServers] = useState(false);
	const [isValidatingNameServers, setIsValidatingNameServers] = useState(false);

	const [requiredNameServers, setRequiredNameServers] = useState();
	const [currentNameServers, setCurrentNameServers] = useState();

	const existingDomainForm = {
		shouldUseNativeValidation: false,
		onSubmit: async (data) => {
			const domain = normalizeUrl(data.domain);
			setDomain(domain);
			setIsGettingNameServers(true);
			const { dnsServers } = await xhr.createTempRootSite(domain);
			setIsGettingNameServers(false);
			setRequiredNameServers(dnsServers);
		}
	};

	const validateNameServers = async () => {
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
	};

	const validateNameServersButtonClassName = classNames('button', isValidatingNameServers ? 'is-loading' : '');

	// user entered a domain and we're waiting for the response
	if (isGettingNameServers) return <>
		<div className="is-relative" style={{ height: '8rem' }}>
			<Loader />
		</div>
		<p>{t.attaching_domain_wait_or_come_later}</p>
	</>;

	// we have the name servers, so we can show them to the user
	if (requiredNameServers) {
		return <Wrapper>
			<div className="content">
				<p>{t.site_ready_for_domain}</p>
				<p>{t.set_nameservers_to_complete}</p>
			</div>
			<NameServerList title={t.required_nameservers} nameServers={requiredNameServers} />
			{currentNameServers && <NameServerList title={t.current_nameservers} nameServers={currentNameServers} noMatch={true} emptyState={t.no_nameservers_found} />}
			<ContactUs className="block" />
			<button className={validateNameServersButtonClassName} onClick={validateNameServers}>${i18n.misc.continue}</button>
		</Wrapper>;
	}

	return <Wrapper>
		<Form {...existingDomainForm}>
			<UrlInputWithAddon
				id={'domain'}
				label={t.domain_url}
				prefix="https://"
				pattern={{ value: /^(http:\/\/|https:\/\/)?(www.)?[a-zA-Z-0-9]+.[a-zA-Z-0-9]+$/, message: t.domain_url_pattern_error }}
			/>
			<button className="button">{i18n.misc.continue}</button>
		</Form>
	</Wrapper>;

}

function NameServerList({ title, nameServers, emptyState, noMatch }) {
	const [{ Editor: { AttachDomain: t } }] = useI18n();
	return <div className="block">
		<span className="has-text-weight-bold">{title}:</span>
		{nameServers.length > 0
			? <pre>
				{nameServers.map((nameServer, index) => <p className="is-ltr" key={index}>{nameServer}</p>)}
			</pre>
			: <div>{emptyState}</div>}
		{/* don't show the error message if no name servers were set at all */}
		{noMatch && nameServers.length > 0 && <p className="help has-text-danger">{t.no_lists_match}</p>}
	</div>;
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