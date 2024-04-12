import { memo, useContext, useEffect, useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import localDb from '@services/localDb';

import useI18n from '@hooks/use-i18n';

import Modal, { useModal, useSuccessModal } from '@wrappers/Modal';
import { Eye, Logout, Sheet } from '@elements/Icon';
import OutboundLink from '@elements/OutboundLink';

import { AuthContext } from '../Auth';

import TrialNotice from './TrialNotice';
import SlugChoice from './SlugChoice';
import AttachDomain from './AttachDomain';

import { logoContainer, versionByLogo, eyeIcon } from './index.module.sass';

export const noticeClassName = 'py-2';

export const SafeHeader = () => <Nav className="is-justify-content-center" />;

export default memo(Header);

function Header() {

	const [{ Editor: { Header: t, AttachDomain: { DomainAttachedSuccessFullyModal } }}] = useI18n();

	const { role, emailVerified, siteId } = useContext(AuthContext);
	const { getValues } = useFormContext();

	const [slugUpdateSuccess, showSlugUpdateSuccess] = useSuccessModal({
		onHide: () => window.location.reload()
	});

	const [slugModal, showSlugModal] = useModal({
		shouldUseNativeValidation: false,
		onSubmit: async ({ slug }) => {
			await xhr.updateSlug({ slug, siteId });
			showSlugUpdateSuccess();
		}
	});

	const [domainModal, showDomainModal] = useModal();
	const [attachDomainSuccessModal, showAttachDomainSuccessModal] = useSuccessModal();
	const onAttachDomainSuccess = (domain) => showAttachDomainSuccessModal({ domain });

	const [isEmailRecentlyVerified, setIsEmailRecentlyVerified] = useState();

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		setIsEmailRecentlyVerified(localDb.get('email-recently-verified'));
	}, []);

	const slug = getValues('slug');

	const leadsTarget = getValues('leadsTarget');
	const isSpreadSheetAddress = leadsTarget.type === 'spreadsheet';
	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${leadsTarget.address }`;

	const burgerClasses = classNames('navbar-burger has-text-white', isOpen && 'is-active');
	const menuClasses = classNames('navbar-menu has-background-primary', isOpen && 'is-active');

	return <>

		{role === 'TRIAL'
			? emailVerified === false
				? <TrialNotice />
				: isEmailRecentlyVerified
					? <EmailIsVerifiedNotice />
					: null
			: null}

		<Nav logoClassName="is-clickable" burgerClasses={burgerClasses} burgerOnClick={toggleMenu}>
			<div className={menuClasses}>
				{isSpreadSheetAddress && <div className="navbar-start is-flex-grow-1">
					<MenuItem label={t.my_leads_sheet} path={spreadSheetAddress} Icon={() => <Sheet className="w-1-touch" />} />
				</div>}
				<div className="navbar-end">
					<MenuItems {...{
						showSlugModal, showDomainModal
					}} />
				</div>
			</div>
		</Nav>

		<Modal {...slugModal} render={SlugChoice} />

		<Modal {...domainModal} render={AttachDomain} onSuccess={onAttachDomainSuccess} slug={slug} />
		<Modal {...attachDomainSuccessModal} render={DomainAttachedSuccessFullyModal} />

		<Modal {...slugUpdateSuccess} render={() => t.slug_updated_successfully} />

	</>;
}

function Nav ({ className: classes, logoClassName, burgerClasses, burgerOnClick, children }) {

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

	return <Link to="/" {...props} />;
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

function wwwIcon() {
	return <span className='is-flex is-justify-content-center is-size-7 is-size-8-touch has-text-weight-bold me-1 w-1-touch' style={{ lineHeight: 1 }}>www</span>;
}

function MenuItems({ showSlugModal, showDomainModal }) {

	const [{ Editor: { Header: t } }] = useI18n();

	const { getValues } = useFormContext();
	const slug = getValues('slug');

	const menuItems = [
		{
			label: t.log_out,
			Icon: () => <Logout className="w-1-touch" />,
			onClick: () => {
				// empty the local storage
				localDb.clear();
				// reload the page
				window.location.reload();
			}
		}
	];

	if (!getValues('isPublic')) {
		// site has yet to be published
		// add publish button
		menuItems.unshift({
			label: t.publish_site,
			Icon: () => <span className='w-1-touch' style={{ fontSize: '1.7rem' }}>★</span>,
			path: '/'
		});

	} else {
		// site is published

		if (!getValues('isSetSlug')) {
			// site has yet to be assigned a slug
			// add slug button
			menuItems.unshift({
				label: t.choose_slug,
				Icon: wwwIcon,
				onClick: () => showSlugModal()
			});

		} else {
			// site is published and has a slug

			if (slug) {
				// site's slug is set and is not empty
				// isSetSlug is set to true and the slug is empty when the user has already connected a domain
				menuItems.unshift({
					label: t.choose_domain,
					Icon: wwwIcon,
					onClick: () => showDomainModal()
				});
			}

			menuItems.unshift({
				label: t.go_to_site,
				Icon: () => <Eye className={eyeIcon} />,
				path: `/${slug}`
			});
		}
	}

	return menuItems.map(MenuItem);

}

function MenuItem({ Icon, label, path, onClick, ...props }) {

	let Wrapper, direction;

	if (onClick) {
		Wrapper = 'div';
		direction = { onClick };
	} else {
		// if path is outbound, use the component OutboundLink, otherwise use Link
		if (!path.includes(window.location.host) && !path.startsWith('/')) {
			Wrapper = OutboundLink;
			direction = { href: path };
		} else {
			Wrapper = Link;
			direction = { to: path };
		}
	}

	return <Wrapper key={label} {...direction} className="navbar-item is-flex is-align-items-center is-clickable has-text-white px-4" {...props}>
		<Icon />
		<div className="icon-text ms-1">{label}</div>
	</Wrapper>;
}

function EmailIsVerifiedNotice () {

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