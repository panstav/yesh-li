import { useContext, useEffect, useState } from "react";
import classNames from "classnames";

import localDb from "@services/localDb";

import { AuthContext } from "@pages/Editor/Auth";

import TrialNotice from "./TrialNotice";
import EmailVerifiedNotice from "./EmailVerifiedNotice";

export const noticeClassName = 'py-2';

export default function TopBanner({ className: classes }) {

	const { role, emailVerified } = useContext(AuthContext);

	const [isEmailRecentlyVerified, setIsEmailRecentlyVerified] = useState();

	useEffect(() => {
		const isEmailVerifiedRecently = localDb.get('email-recently-verified');
		if (!isEmailVerifiedRecently) return;
		setIsEmailRecentlyVerified(isEmailVerifiedRecently);
	}, []);

	let Notice;
	if (role === 'TRIAL') {
		if (!emailVerified) {
			Notice = TrialNotice;
		} else if (isEmailRecentlyVerified) {
			Notice = EmailVerifiedNotice;
		}
	}

	if (!Notice) return null;

	const className = classNames('has-radius', classes);

	return <div className={className}>
		{/* <TrialNotice /> */}
		<Notice />
	</div>;
}