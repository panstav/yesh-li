import { useState } from "react";
import classNames from "classnames";

import useEvery from "@domains/india4wdtours/hooks/use-every";

import { isSuccessOnHover } from "@domains/india4wdtours/index.module.sass";

export const ratingStarStyle = { width: '1rem', marginInlineEnd: '5px' };

export default function StickyHeader({ children }) {

	const [showSticky, setShowSticky] = useState(false);

	useEvery(() => {
		setShowSticky(window.scrollY > 1000);
	}, '500');

	const className = classNames('navbar is-fixed-top is-flex is-justify-content-space-between is-align-items-center', showSticky || 'is-hidden');

	return <div className={className}>
		{children}
	</div>;
}

export function getTitleClassNames({ withTitleAside }) {
	return classNames('title is-5 is-size-4-tablet has-text-weight-normal mb-1 mb-0-tablet', withTitleAside ? 'me-2' : 'pb-2');
}

export function getCtaClassNames() {
	return classNames("button is-size-7 is-size-6-tablet ms-2", isSuccessOnHover);
}