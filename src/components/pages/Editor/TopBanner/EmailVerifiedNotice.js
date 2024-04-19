import { useState } from "react";
import classNames from "classnames";

import localDb from "@services/localDb";

import useI18n from "@hooks/use-i18n";

import { noticeClassName } from ".";

export default function EmailVerifiedNotice() {

	const [{ Editor: { Header: t } }] = useI18n();

	const [isHidden, setIsHidden] = useState(false);
	const hideNotice = () => {
		localDb.unset('email-recently-verified');
		setIsHidden(true);
	};

	const className = classNames("has-background-success is-relative", noticeClassName);

	if (isHidden) return null;

	return <div className={className}>
		<span onClick={hideNotice} className='delete is-overlay m-auto' style={{ 'inset-inline-start': 'unset', 'inset-inline-end': '0.5rem' }} />
		<div className='has-text-centered has-text-white'>
			{t.email_verified_successfully}
		</div>
	</div>;
}