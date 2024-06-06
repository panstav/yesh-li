import { useContext } from 'react';
import classNames from 'classnames';

import { Email, Facebook, Instagram, LinkedIn, Phone, Pinterest, TikTok, WhatsApp, X, YouTube } from '@elements/Icon';
import OutboundLink from '@elements/OutboundLink';

import hrefByAddressType from '@lib/href-by-address-type';

import { PageContext } from './Theme';

const copy = {
	facebook: {
		Icon: Facebook,
		label: 'פייסבוק'
	},
	instagram: {
		Icon: Instagram,
		label: 'אינסטגרם'
	},
	linkedin: {
		Icon: ({ style, ...props }) => <LinkedIn {...props} style={{ width: '1rem', ...style }} />,
		label: 'לינקדאין'
	},
	twitter: {
		Icon: ({ style, ...props }) => <X {...props} style={{ width: '1rem', ...style }} />,
		label: 'טוויטר'
	},
	pinterest: {
		Icon: ({ style, ...props }) => <Pinterest {...props} style={{ width: '1rem', ...style }} />,
		label: 'פינטרסט'
	},
	youtube: {
		Icon: ({ style, ...props }) => <YouTube {...props} style={{ width: '1rem', ...style }} />,
		label: 'יוטיוב'
	},
	tiktok: {
		Icon: ({ style, ...props }) => <TikTok {...props} style={{ width: '1rem', ...style }} />,
		label: 'טיקטוק'
	},
	whatsapp: {
		Icon: ({ style, ...props }) => <WhatsApp {...props} style={{ width: '1rem', ...style }} />,
		label: 'וואטסאפ'
	},
	phone: {
		Icon: ({ style, ...props }) => <Phone {...props} style={{ width: '1rem', ...style }} />,
		label: 'טלפון'
	},
	email: {
		Icon: ({ style, ...props }) => <Email {...props} style={{ width: '1rem', ...style }} />,
		label: 'אימייל'
	}
};

export default function Socials ({ className: classes }) {
	const { content: { socials } } = useContext(PageContext);
	const socialsArray = Object.entries(socials).map(([type, address]) => ({ type, address })).sort(byPlatform);
	const className = classNames('tags', classes);
	return <div className={className}>
		{socialsArray.map(({ type, address }) => {
			const href = hrefByAddressType(type, address);
			const { Icon, label } = copy[type];
			const style = { backgroundColor: `var(--color-${type}-half)`, ...(['phone', 'email'].includes(type) ? { border: '1px solid var(--color-primary)' } : {}) };
			return <OutboundLink key={type} href={href} className="tag is-rounded" style={style}>
				<Icon className="has-strong-radius" style={{ color: `var(--color-${type})` }} />
				<span className="icon-text ms-1">{label}</span>
			</OutboundLink>;
		})}
	</div>;
}

// sort platform profile urls by their type index on the copy object
function byPlatform (a, b) {
	const platforms = Object.keys(copy);
	return platforms.indexOf(a.type) - platforms.indexOf(b.type);
}