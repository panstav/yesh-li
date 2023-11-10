import { memo, useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';

import Tooltip from '@wrappers/Tooltip';
import { Logo, Logout, Sheet } from '@elements/Icon';
import Help from '@elements/Help';
import localDb from '@services/localDb';

import TrialNotice from './TrialNotice';
import { AuthContext } from '@pages/Editor/Auth';

export const noticeClassName = 'py-2';

export default memo(Header);

function Header() {

	const { role, emailVerified } = useContext(AuthContext);

	const { getValues } = useFormContext();
	const [isEmailRecentlyVerified, setIsEmailRecentlyVerified] = useState();

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		setIsEmailRecentlyVerified(localDb.get('email-recently-verified'));
	}, []);

	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${getValues('leadsTarget.address') }`;

	const menuItems = [
		{
			label: 'יציאה',
			Icon: Logout,
			onClick: () => {
				localDb.clear();
				window.location.reload();
			}
		}
	];

	if (!getValues('isPublic')) {
		menuItems.unshift({
			label: 'הוצאה לאור',
			Icon: () => '★',
			path: '/',
			Suffix: () => <Tooltip content="אחרי ההוצאה לאור - הדף יהיה נגיש למבקרים" className="is-flex is-is-align-items-center ms-2"><Help size="small" /></Tooltip>
		});
	} else {
		menuItems.unshift({
			label: 'בחירת כתובת',
			Icon: Www,
			onClick: () => openSlugModal()
		});
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
				<div className="navbar-start is-flex-grow-1">
					<MenuItem label="גיליון הפניות שלי" path={spreadSheetAddress} Icon={Sheet} />
				</div>
				<div className="navbar-end">
					{menuItems.map(MenuItem)}
				</div>
			</div>

		</nav>

	</>;
}

function MenuItem({ Icon, label, path, onClick, Suffix = ()=>null, ...props }) {

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
		<Suffix />
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