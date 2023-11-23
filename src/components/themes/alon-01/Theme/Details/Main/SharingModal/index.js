import { useContext, useState } from "react";
import classNames from "classnames";

import { Title } from "@wrappers/Modal";
import { Email, Facebook, LinkedIn, WhatsApp, X, Copy, Telegram } from '@elements/Icon';

import { PageContext } from "@config/Page";
import copyToClipboard from "@lib/copy-to-clipboard";

import { topContainer } from "./sharing-modal.module.sass";

export default function SharingModal ({ qr, url }) {
	const { content: { fullName, occupation } } = useContext(PageContext);

	const [hasCopied, setHasCopied] = useState(false);

	// separate the copy function from the displayCopied function so that user can choose to copy part of the url
	// user clicks on the input to start selecting, onMouseDown copies the whole url, user selects part of the url and presses ctrl+c or cmd+c which overwrites the copied (full) url, onMouseUp displays the "copied" message
	const copy = () => copyToClipboard(url);
	const displayCopied = () => {
		clearTimeout(hasCopied);
		const timer = setTimeout(() => setHasCopied(false), 3000);
		setHasCopied(timer);
	};

	const inputClassName = classNames('input', hasCopied ? 'has-background-success-light' : 'has-text-left');

	return <>

		<div className={topContainer}>
			<QR qr={qr} style={{ margin: '1px' }} />

			<div onMouseDown={copy} onMouseUp={displayCopied} className="field has-addons is-justify-content-center mt-3">
				<div className="control">
					<button title="להעתיק את הקישור" className="button">
						<Copy />
					</button>
				</div>
				<div className="control is-relative is-flex-grow-1">
					<input className={inputClassName} type="text" value={hasCopied ? 'הקישור הועתק!' : url} readOnly />
				</div>
			</div>
		</div>

		<Title className="is-justify-content-center">שתפו:</Title>
		<ShaingButtons url={url} title={`${occupation} • ${fullName}`} className="mb-5" />

	</>;
}

function QR({ qr, style }) {
	if (!qr) return null;
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shapeRendering="crispEdges" {...{ style }}>
		<path style={{ stroke: 'var(--color-primary-900)' }} d={qr} />
	</svg>;
}

const copyByPlatform = {
	whatsapp: {
		Icon: ({ style, ...props }) => <WhatsApp {...props } style = {{ width: '1rem', ...style }} />,
		label: 'וואטסאפ',
		href: ({ url, title }) => `whatsapp://send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`
	},
	facebook: {
		Icon: Facebook,
		label: 'פייסבוק',
		href: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
	},
	linkedin: {
		Icon: ({ style, ...props }) => <LinkedIn {...props} style={{ width: '1rem', ...style }} />,
		label: 'לינקדאין',
		href: ({ url, title }) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
	},
	twitter: {
		Icon: ({ style, ...props }) => <X {...props} style={{ width: '1rem', ...style }} />,
		label: 'טוויטר',
		href: ({ url, title }) => `https://twitter.com/intent/tweet/?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
	},
	telegram: {
		label: 'טלגרם',
		Icon: ({ style, ...props }) => <Telegram {...props} style={{ width: '1rem', ...style }} svgProps={{ style: { fillRule: 'evenodd' } }} />,
		href: ({ url, title }) => `https://telegram.me/share/url?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
	},
	email: {
		Icon: ({ style, ...props }) => <Email {...props} style={{ width: '1rem', ...style }} />,
		label: 'אימייל',
		href: ({ url, title }) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
	}
};

function ShaingButtons({ className: classes, ...props }) {
	const className = classNames('tags is-centered', classes);
	return <div className={className}>
		{Object.entries(copyByPlatform).map(([type, { Icon, label, href }]) => {
			return <a key={label} href={href(props)} title={`שתפו ב${label}`} className="tag is-rounded" target="_blank" rel="noopener noreferrer">
				<Icon className="has-strong-radius" style={{ color: `var(--color-${type})` }} />
				<span className="icon-text ms-1">{label}</span>
			</a>;
		})}
	</div>;
}