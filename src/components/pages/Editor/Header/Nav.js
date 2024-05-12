import { graphql, useStaticQuery } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import useI18n from '@hooks/use-i18n';

import { logoContainer, versionByLogo } from './index.module.sass';

export default function Nav({ className: classes, logoClassName, burgerClasses, burgerOnClick, children }) {

	const [{ multi: { Logo } }] = useI18n();

	const className = classNames("navbar has-background-primary", classes);
	const logoContainerClassName = classNames('navbar-item', logoClassName, logoContainer);
	const versionClassName = classNames('is-size-8 has-text-white', versionByLogo);
	return <nav className={className} style={{ boxShadow: '0px 20px 30px 10px var(--color-background)' }}>
		<div className="navbar-brand is-justify-content-center">
			<LogoLinkWrapper className="is-flex">
				<div className={logoContainerClassName}>
					<Logo className="has-text-white mx-0" style={{ width: '3.5rem' }} />
					<Version className={versionClassName} />
				</div>
			</LogoLinkWrapper>
			{burgerClasses && <div className={burgerClasses} onClick={burgerOnClick}>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</div>}
		</div>
		{children}
	</nav>;
}

function LogoLinkWrapper(props) {

	// by default slug would be falsy
	// by default users at a multisite - have a slug
	// and users that move to their own domain - don't have a slug on their siteData but multisite reserved their slug to redirect
	if (!useFormContext()?.getValues('slug')) return props.children;

	return <a href="/" {...props} />;
}

function Version({ className }) {

	const { site: { siteMetadata: { version } } } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					version
				}
			}
		}
	`);

	return <span className={className}>v{version}</span>;
}