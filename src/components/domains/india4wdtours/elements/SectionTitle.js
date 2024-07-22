import classNames from "classnames";

import OutboundLink from "@elements/OutboundLink";
import RenderChildren from "@wrappers/RenderChildren";

import { isPrimaryOnHover } from "@domains/india4wdtours/index.module.sass";

export default function SectionTitle({ id, aside = [], ...props }) {

	const isWithAside = !!aside.length;
	const Wrapper = isWithAside ? 'div' : RenderChildren;

	const wrapperClassName = classNames("is-flex is-justify-content-space-between mb-5", props.href ? 'is-align-items-baseline' : 'is-align-items-center');
	const titleClassName = classNames('title is-5 has-text-weight-normal', isWithAside ? 'mb-0' : 'mb-5');

	return <Wrapper className={wrapperClassName}>
		<h2 id={id} className={titleClassName} {...props} />
		{aside.map(AsideItem)}
	</Wrapper>;
}

function AsideItem({ wrapper, children = null, ...props }, index) {

	const Wrapper = (() => {
		if (['string', 'function'].includes(typeof wrapper)) return wrapper;
		if (props.href) return props.href.startsWith('/') ? 'a' : OutboundLink;
		if (props.onClick) return 'button';
		return RenderChildren;
	})();

	if (props.onClick) props.className = classNames(props.className, "button", isPrimaryOnHover);

	return <Wrapper key={index} {...props}>{children}</Wrapper>;
}