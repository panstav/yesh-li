import { useState } from "react";
import classNames from "classnames";

import { Title } from "@wrappers/Modal";
import OutboundLink from "@elements/OutboundLink";

import ExistingDomain from "./ExistingDomain";

import { liveDnsHref, nameCheapHref } from "/variables";

export default function AttachDomain({ onSuccess: onSuccessHandler, slug: currentSlug, hideModal }) {

	const [panel, setPanel] = useState('existing');

	const newDomainClassName = classNames(panel === 'new' ? 'is-active' : '', 'w-100 has-text-centered');
	const existingDomainClassName = classNames(panel === 'existing' ? 'is-active' : '', 'w-100 has-text-centered');

	const goToExistingDomainPanel = () => setPanel('existing');

	const onSuccess = (domain) => {
		hideModal();
		onSuccessHandler(domain);
	};

	return <>
		<Title>חיבור דומיין לאתר</Title>
		<p className="panel-tabs">
			<a onClick={goToExistingDomainPanel} className={existingDomainClassName}>חיבור דומיין קיים</a>
			<a onClick={() => setPanel('new')} className={newDomainClassName}>רכישת דומיין חדש</a>
		</p>

		{panel === 'existing' && <ExistingDomain {...{
			wrapper: Wrapper,
			contactUs: ContactUs,
			onSuccess,
			currentSlug
		}} />}

		{panel === 'new' && <Wrapper className="content">
			<p>בשלב זה אין אפשרות לרכוש דומיין דרך המערכת.</p>
			<p>אנו ממליצים לרכוש את הדומיין שלכם דרך <OutboundLink href={liveDnsHref}>LiveDNS</OutboundLink> במידה ואתם רוצים סיומת ישראלית ודרך <OutboundLink href={nameCheapHref}>Namecheap</OutboundLink> עבור כל סיומת אחרת.</p>
			<p>לאחר שתרכשו את הדומיין שלכם תוכלו להמשיך עם ההוראות שבלשונית <a onClick={goToExistingDomainPanel}>חיבור דומיין קיים</a>.</p>
			<ContactUs />
		</Wrapper>}
	</>;
}

function Wrapper ({ className: classes, children }) {
	const className = classNames('mt-5', classes);
	return <div className={className}>
		{children}
	</div>;
}

function ContactUs ({ className }) {
	return <p className={className}>תרגישו חופשי <OutboundLink href="mailto:hello@yesh.li">ליצור איתנו קשר</OutboundLink> אם תצטרכו עזרה בתהליך.</p>;
}