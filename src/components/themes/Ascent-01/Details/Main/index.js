import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import Modal, { useModal } from "@wrappers/Modal";
import { Email, Facebook, Instagram, LinkedIn, TikTok, WhatsApp, X, YouTube, Phone, Pinterest } from "@elements/Icon";

import xhr from '@services/xhr';
import hrefByAddressType from "@lib/href-by-address-type";

import Sections from "./Sections";
import ContactForm from "./ContactForm";
import Video from "./Video";
import Gallery from "./Gallery";

import { boxes } from "./main.module.sass";

const copy = {
	facebook: ({ style, ...props }) => <Facebook {...props} style={{ ...style, width: '1.5rem', marginInlineStart: '-0.25rem' }} />,
	instagram: ({ style, ...props }) => <Instagram {...props} style={{ ...style, width: '1.5rem', marginInlineStart: '-0.25rem' }} />,
	linkedin: LinkedIn,
	twitter: X,
	pinterest: Pinterest,
	youtube: YouTube,
	tiktok: TikTok,
	whatsapp: WhatsApp,
	phone: Phone,
	email: Email
};

export default function Main() {
	const { content: { fullName, occupation, description, statement, links, ctaHeader } } = useContext(PageContext);

	const [contactModal, showContactModal] = useModal({
		title: ctaHeader,
		onSubmit: (data) => xhr.postLead(data)
			.then(() => alert('אחלה, נשתמע!'))
			.catch(() => alert('שגיאת מערכת, נסו שוב מאוחר יותר.'))
	});
	const contactByForm = (interest) => showContactModal({ interest });

	const boxesContainerClassName = classNames(boxes, "mt-3 px-2");

	return <>
		<div className="px-4">
			<h1 className="title is-2">{fullName}</h1>
			<h2 className="subtitle is-4">{occupation}</h2>
			<p>{description}</p>
		</div>

		{!!links.length && <div className={boxesContainerClassName}>
			{links.sort(byPlatform).map(({ type, label, address }) => {
				const Icon = copy[type];
				const href = hrefByAddressType(type, address);
				return <div key={address} className="box is-relative">
					<a href={href} target="_blank" rel="noreferrer">
						<Icon style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
						<span className="icon-text px-5 mx-3">{label}</span>
					</a>
				</div>;
			})}
		</div>}

		<Video className="mt-3" />

		<Gallery className="mt-3" />

		<Sections {...{ contactByForm }} className="mt-3" />

		{statement && <div className="px-4 py-3 mt-6 mb-5" style={{ backgroundColor: 'var(--color-primary-50)', borderInlineStart: '3px solid var(--color-primary-900)', borderInlineEnd: '3px solid transparent' }}>
			<p>{statement.author && '"'}{statement.content}{statement.author && '"'}</p>
			{statement.author && <span className="is-block has-text-end mt-2">- {statement.author}</span>}
		</div>}

		<Modal {...contactModal} render={ContactForm} />

	</>;
}

function byPlatform (a, b) {
	return Object.keys(copy).indexOf(a.type) - Object.keys(copy).indexOf(b.type);
}