import { memo, useContext, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import xhr from '@services/xhr';
import localDb from '@services/localDb';

import useI18n from '@hooks/use-i18n';

import Modal, { useModal, useSuccessModal } from '@wrappers/Modal';
import { Eye, Logout, Sheet } from '@elements/Icon';
import OutboundLink from '@elements/OutboundLink';

import { AuthContext } from '../Auth';
import SlugChoice from './SlugChoice';
import AttachDomain from './AttachDomain';

import { logoContainer, versionByLogo, eyeIcon } from './index.module.sass';

export const SafeHeader = () => <Nav className="is-justify-content-center" />;

export default memo(Header, () => true);

function Header() {

	const [{ Editor: { Header: t, AttachDomain: { DomainAttachedSuccessFullyModal } }}] = useI18n();

	const { siteId } = useContext(AuthContext);

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

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	const burgerClasses = classNames('navbar-burger has-text-white', isOpen && 'is-active');
	const menuClasses = classNames('navbar-menu has-background-primary', isOpen && 'is-active');

	return <>

		<Nav logoClassName="is-clickable" burgerClasses={burgerClasses} burgerOnClick={toggleMenu}>
			<div className={menuClasses}>
				<GoToSpreadsheet />
				<div className="navbar-end">
					<MenuItems {...{
						showSlugModal, showDomainModal
					}} />
				</div>
			</div>
		</Nav>

		<Modal {...slugModal} render={SlugChoice} />

		<Modal {...domainModal} render={AttachDomain} onSuccess={onAttachDomainSuccess} />
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

function GoToSpreadsheet () {

	const [{ Editor: { Header: t } }] = useI18n();

	const leadsTarget = useFormContext().getValues('leadsTarget');

	const isSpreadSheetAddress = leadsTarget.type === 'spreadsheet';
	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${leadsTarget.address}`;

	if (!isSpreadSheetAddress) return null;

	return <div className="navbar-start is-flex-grow-1">
		<MenuItem label={t.my_leads_sheet} path={spreadSheetAddress} Icon={() => <Sheet className="w-1-touch" />} />
	</div>;
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

function wwwIcon() {
	return <div className='w-1-touch'>
		<span className='is-flex is-justify-content-center is-size-7 is-size-8-touch has-text-weight-bold' style={{ lineHeight: 1, marginBottom: '0.05em' }}>www</span>
	</div>;
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
			Icon: () => <span className='w-1-touch' style={{ fontSize: '115%' }}>★</span>,
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
			Wrapper = 'a';
			direction = { to: path };
		}
	}

	return <Wrapper key={label} {...direction} className="navbar-item is-flex is-align-items-center is-clickable has-text-white px-4" {...props}>
		<Icon />
		<div className="icon-text ms-1">{label}</div>
	</Wrapper>;
}