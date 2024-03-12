import { memo, useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';

import Modal, { useModal, useSuccessModal } from '@wrappers/Modal';
import { Eye, Logo, Logout, Sheet } from '@elements/Icon';

import xhr from '@services/xhr';
import localDb from '@services/localDb';

import TrialNotice from './TrialNotice';
import SlugChoice from './SlugChoice';
import { AuthContext } from '@pages/Editor/Auth';

import { eyeIcon } from './index.module.sass';

export const noticeClassName = 'py-2';

export default memo(Header);

function Header() {

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

	const [isEmailRecentlyVerified, setIsEmailRecentlyVerified] = useState();

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		setIsEmailRecentlyVerified(localDb.get('email-recently-verified'));
	}, []);

	const leadsTarget = getValues('leadsTarget');
	const isSpreadSheetAddress = leadsTarget.type === 'spreadsheet';
	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${leadsTarget.address }`;

	const menuItems = [
		{
			label: 'יציאה',
			Icon: () => <Logout className="w-1-touch" />,
			onClick: () => {
				localDb.clear();
				window.location.reload();
			}
		}
	];

	if (!getValues('isPublic')) {
		// site has yet to be published
		// add publish button
		menuItems.unshift({
			label: 'הוצאה לאור',
			Icon: () => <span className='w-1-touch' style={{ fontSize: '1.7rem' }}>★</span>,
			path: '/'
		});
	} else {
		// site is published
		if (!getValues('isSetSlug')) {
			// site has yet to be assigned a slug
			// add slug button
			menuItems.unshift({
				label: 'בחירת כתובת',
				Icon: () => <span className='is-size-7 has-text-weight-bold me-1 w-1-touch' style={{ lineHeight: 1 }}>www</span>,
				onClick: () => showSlugModal()
			});
		} else {
			// site is published and has a slug
			menuItems.unshift({
				label: 'מעבר לעמוד',
				Icon: () => <Eye className={eyeIcon} />,
				path: `/${getValues('slug')}`
			});
		}
	}

	const burgerClasses = classnames('navbar-burger has-text-white', isOpen && 'is-active');
	const menuClasses = classnames('navbar-menu has-background-primary', isOpen && 'is-active');

	return <>

		{role === 'TRIAL'
			? emailVerified === false
				? <TrialNotice />
				: isEmailRecentlyVerified
					? <EmailIsVerifiedNotice />
					: null
			: null}

		<nav className="navbar has-background-primary" style={{ boxShadow: '0px 20px 30px 10px var(--color-background)' }}>
			<div className="navbar-brand is-justify-content-center">
				<div className="navbar-item is-clickable">
					<Logo className="has-text-white mx-0" style={{ width: '3.5rem' }} />
				</div>
				<div className={burgerClasses} onClick={toggleMenu}>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</div>
			</div>

			<div className={menuClasses}>
				{isSpreadSheetAddress && <div className="navbar-start is-flex-grow-1">
					<MenuItem label="גיליון הפניות שלי" path={spreadSheetAddress} Icon={() => <Sheet className="w-1-touch" />} />
				</div>}
				<div className="navbar-end">
					{menuItems.map(MenuItem)}
				</div>
			</div>

		</nav>

		<Modal {...slugModal} render={SlugChoice} />

		<Modal {...slugUpdateSuccess} render={() => <>
			כתובת האתר עודכנה, תוך פחות משעה העמוד שלך יהיה נגיש.
		</>} />

	</>;
}

function MenuItem({ Icon, label, path, onClick, ...props }) {

	let Wrapper, direction;

	if (onClick) {
		Wrapper = 'div';
		direction = { onClick };
	} else {
		// if path is outbound, add target="_blank" and rel="noopener noreferrer"
		if (!path.includes(window.location.host) && !path.startsWith('/')) {
			Wrapper = 'a';
			direction = {
				href: path,
				target: '_blank',
				rel: 'noopener noreferrer'
			};
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

	const [isHidden, setIsHidden] = useState(false);
	const hideNotice = () => {
		localDb.unset('email-recently-verified');
		setIsHidden(true);
	};

	const className = classnames("has-background-success is-relative", noticeClassName);

	if (isHidden) return null;

	return <div className={className}>
		<span onClick={hideNotice} className='delete is-overlay m-auto' style={{ 'inset-inline-start': 'unset', 'inset-inline-end': '0.5rem' }} />
		<div className='has-text-centered has-text-white'>
			כתובת המייל אומתה בהצלחה.
		</div>
	</div>;
}