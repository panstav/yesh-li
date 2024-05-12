import { useFormContext } from 'react-hook-form';

import localDb from '@services/localDb';
import useI18n from '@hooks/use-i18n';

import { Eye, Logout } from '@elements/Icon';
import OutboundLink from '@elements/OutboundLink';

import { eyeIcon } from './index.module.sass';

export default function MenuItems({ showSlugModal, showDomainModal }) {

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

export function MenuItem({ Icon, label, path, onClick, ...props }) {

	let Wrapper, direction;

	if (onClick) {
		Wrapper = 'div';
		direction = { onClick };
	} else {
		direction = { href: path };
		// if path is outbound, use the component OutboundLink, otherwise use Link
		if (!path.includes(window.location.host) && !path.startsWith('/')) {
			Wrapper = OutboundLink;
		} else {
			Wrapper = 'a';
		}
	}

	return <Wrapper key={label} {...direction} className="navbar-item is-flex is-align-items-center is-clickable has-text-white px-4" {...props}>
		<Icon />
		<div className="icon-text ms-1">{label}</div>
	</Wrapper>;
}

function wwwIcon() {
	return <div className='w-1-touch'>
		<span className='is-flex is-justify-content-center is-size-7 is-size-8-touch has-text-weight-bold' style={{ lineHeight: 1, marginBottom: '0.05em' }}>www</span>
	</div>;
}