import classNames from "classnames";

import { titleFont } from '@domains/yeshli/index.module.sass';

export default function SectionTitle({ className: classes, children }) {
	const titleClassName = classNames("title is-3 has-text-centered", titleFont, classes);
	return <h2 className={titleClassName} style={{ lineHeight: '1.3' }}>{children}</h2>;
}