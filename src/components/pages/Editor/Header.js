import { useState } from 'react';
import { Link } from 'gatsby';
import { useFormContext } from 'react-hook-form';
import classnames from 'classnames';

import localDb from '@services/localDb';
import { Logo, Logout, Sheet } from '@elements/Icon';

export default function Header() {
	const { getValues } = useFormContext();

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	const spreadSheetAddress = `https://docs.google.com/spreadsheets/d/${getValues('leadsTarget.address') }`;

	const logOutLink = {
		label: 'יציאה',
		Icon: Logout,
		onClick: () => {
			localDb.clear();
			window.location.href = window.location.href + '';
		}
	};

	const burgerClasses = classnames('navbar-burger has-text-white', isOpen && 'is-active');
	const menuClasses = classnames('navbar-menu has-background-primary', isOpen && 'is-active');

	return <nav className="navbar has-background-primary" style={{ boxShadow: '0px 20px 30px 10px var(--color-background)' }}>
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
				<MenuItem {...logOutLink} />
			</div>
		</div>

	</nav>;
}

function MenuItem({ Icon, label, path, onClick, ...props }) {

	let Wrapper, direction;

	if (onClick) {
		Wrapper = 'div';
		direction = { onClick };
	} else {
		Wrapper = Link;
		direction = { to: path };
		// if path is outbound, add target="_blank" and rel="noopener noreferrer"
		if (!path.includes(window.location.host)) {
			direction.target = '_blank';
			direction.rel = 'noopener noreferrer';
		}
	}

	return <Wrapper key={label} {...direction} className="navbar-item is-flex is-align-items-center is-clickable has-text-white px-4" {...props}>
		<Icon />
		<div className="icon-text mr-1">{label}</div>
	</Wrapper>;
}