import { useState } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import useI18n from "@hooks/use-i18n";

import { Title } from "@wrappers/Modal";

import ExistingDomain from "./ExistingDomain";

export default function AttachDomain({ onSuccess: onSuccessHandler, hideModal }) {

	const [{ Editor: { AttachDomain: { ContactUs, BuyingDomainUnavailable, ...t } } }] = useI18n();

	const currentSlug = useFormContext().getValues('slug');

	const [panel, setPanel] = useState('existing');

	const newDomainClassName = classNames(panel === 'new' ? 'is-active' : '', 'w-100 has-text-centered');
	const existingDomainClassName = classNames(panel === 'existing' ? 'is-active' : '', 'w-100 has-text-centered');

	const goToExistingDomainPanel = () => setPanel('existing');

	const onSuccess = (domain) => {
		hideModal();
		onSuccessHandler(domain);
	};

	return <>
		<Title>{t.attach_domain_to_site}</Title>
		<p className="panel-tabs">
			<a onClick={goToExistingDomainPanel} className={existingDomainClassName}>{t.use_existing_domain}</a>
			<a onClick={() => setPanel('new')} className={newDomainClassName}>{t.buy_new_domain}</a>
		</p>

		{panel === 'existing' && <ExistingDomain {...{
			wrapper: Wrapper,
			contactUs: ContactUs,
			onSuccess,
			currentSlug
		}} />}

		{panel === 'new' && <Wrapper className="content">
			<BuyingDomainUnavailable {...{
				goToExistingDomainPanel
			}} />
		</Wrapper>}
	</>;
}

function Wrapper ({ className: classes, children }) {
	const className = classNames('mt-5', classes);
	return <div className={className}>
		{children}
	</div>;
}