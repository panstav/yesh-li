import { useState } from 'react';
import classNames from 'classnames';

import Section from '@wrappers/Section';
import AllowInteractionOnPreview from '@elements/AllowInterationOnPreview';

import routes from '@themes/tom-01/Theme/lib/menu-items';

import { navbar } from './index.module.sass';

export default function Header() {

	const [isOpened, setIsOpened] = useState(false);
	const toggleMenu = () => setIsOpened(!isOpened);
	const onClick = () => setIsOpened(false);

	const navbarClassName = classNames("navbar has-background-black reset-anchors", navbar);
	const menuClasses = classNames('navbar-menu has-background-black reset-anchors', isOpened && 'is-active');
	const burgerClasses = classNames('navbar-burger has-text-white', isOpened && 'is-active');

	return <nav className="has-background-black">
		<Section noTopMargin>
			<div className={navbarClassName}>
				<div className="navbar-brand">
					<AllowInteractionOnPreview component="a" className="navbar-item has-text-white is-uppercase has-text-weight-bold" href="/">
						Tom Bezrukov
					</AllowInteractionOnPreview>

					<AllowInteractionOnPreview component="button" onClick={toggleMenu} className={burgerClasses}>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</AllowInteractionOnPreview>
				</div>
				<div className={menuClasses}>
					<div className="navbar-end">
						{routes.map(({ slug, label, sub }) => {
							if (!sub) return <MenuLink href={`/${slug}`} onClick={onClick} key={slug}>{label}</MenuLink>;
							return <div key={slug} className="navbar-item has-dropdown is-hoverable">
								<span className="navbar-link has-background-black has-text-white has-text-weight-bold">
									{label}
								</span>
								<div className="navbar-dropdown has-background-black">
									{sub.map(({ slug, label }) => {
										return <MenuLink href={`/${slug}`} onClick={onClick} key={slug}>{label}</MenuLink>;
									})}
								</div>
							</div>;
						})}
					</div>
				</div>
			</div>
		</Section>
	</nav>;
}

function MenuLink({ children, ...props }) {
	return <AllowInteractionOnPreview component="a" className="navbar-item has-text-white has-text-weight-bold" {...props}>
		{children}
	</AllowInteractionOnPreview>;
}