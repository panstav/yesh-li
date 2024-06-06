import classNames from "classnames";

import useI18n from "@hooks/use-i18n";

import Form from "@wrappers/Form";
import UrlInputWithAddon from "@elements/Fields/UrlInputWithAddon";

import regexes from "@lib/regexes";

export default function ExistingDomain({ existingDomainForm, requiredNameServers, currentNameServers, validateNameServers, isValidatingNameServers, contactUs: ContactUs, wrapper: Wrapper }) {

	const [i18n, { Editor: { AttachDomain: t } }] = useI18n();

	// we have the name servers, so we can show them to the user
	if (requiredNameServers) {
		const validateNameServersButtonClassName = classNames('button', isValidatingNameServers ? 'is-loading' : '');

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
				pattern={{ value: regexes.domain, message: t.domain_url_pattern_error }}
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