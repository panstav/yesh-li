import { useState } from 'react';
import classNames from 'classnames';

import Section from '@wrappers/Section';
import AllowInteractionOnPreview from '@elements/AllowInterationOnPreview';

import { navbar } from './index.module.sass';
import { useSiteContent } from '@hooks/use-site-data';

export default function Header() {

	const routes = useMenuItems();

	const [isOpened, setIsOpened] = useState(false);
	const toggleMenu = () => setIsOpened(!isOpened);
	const onClick = () => setIsOpened(false);

	const navbarClassName = classNames("navbar reset-anchors", navbar);
	const menuClasses = classNames('navbar-menu reset-anchors', isOpened && 'is-active');
	const burgerClasses = classNames('navbar-burger', isOpened && 'is-active');

	return <nav>
		<Section noTopMargin noSidePadding>
			<div className={navbarClassName}>
				<div className="navbar-brand">
					<AllowInteractionOnPreview component="a" className="navbar-item is-uppercase has-text-weight-bold" href="/">
						<FakeLogo />
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
								<PossiblyMenuLink href={`/${slug}`} className="navbar-link has-text-weight-bold">
									{label}
								</PossiblyMenuLink>
								<div className="navbar-dropdown">
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
	return <AllowInteractionOnPreview component="a" className="navbar-item has-text-weight-bold" {...props}>
		{children}
	</AllowInteractionOnPreview>;
}

function PossiblyMenuLink({ children, ...props }) {
	const Wrapper = props.href !== '/' ? MenuLink : 'div';
	return <Wrapper {...props}>
		{children}
	</Wrapper>;
}

function useMenuItems() {
	const { collectionPages: { destination } } = useSiteContent();

	const featuredDestinations = destination.sort(() => Math.random() - 0.5).slice(0, 3);

	return [
		{ slug: 'destinations', label: 'Destinations', sub: featuredDestinations.map(({ slug, title }) => ({
			slug: `destination/${slug}`, label: title
		})).concat({ slug: 'destinations', label: 'All destinations' }) }
	];
}

function FakeLogo(props) {
	return <div {...props}>
		jeeps.in
	</div>;
}

// function RealLogo() {
// 	return <>
// 		<span style={{ marginInlineEnd: '3px' }}>🇮🇳</span>4wd.tours;
// 	</>;
// }