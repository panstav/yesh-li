import classNames from "classnames";

import { Checkmark } from "@elements/Icon";

import { dashedUnderline } from "@domains/india4wdtours/index.module.sass";

export default function Certified({ className: classes }) {
	const className = classNames("tag is-rounded", classes);
	return <span className={className} style={{ marginTop: '2px' }}>
		<Checkmark className="is-size-5" style={{ marginInlineStart: '-3px' }} />
		<span title="Certification available on guide's page" className={dashedUnderline} style={{ lineHeight: '1.2' }}>Certified</span>
	</span>;
}