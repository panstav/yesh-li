import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import Modal, { useModal } from "@wrappers/Modal";
import { Email, Facebook, Instagram, LinkedIn, TikTok, WhatsApp, X, YouTube, Phone, Pinterest, AddContact, Share } from "@elements/Icon";

import xhr from '@services/xhr';
import hrefByAddressType from "@lib/href-by-address-type";

import Sections from "./Sections";
import Video from "./Video";
import Gallery from "./Gallery";
import ContactForm from "./ContactForm";
import SharingModal from "./SharingModal";

import { boxes } from "./main.module.sass";

const copy = {
	facebook: {
		Icon: ({ style, ...props }) => <Facebook {...props} style={{ ...style, width: '1.5rem', marginInlineStart: '-0.25rem' }} />,
		label: 'פייסבוק'
	},
	instagram: {
		Icon: ({ style, ...props }) => <Instagram {...props} style={{ ...style, width: '1.5rem', marginInlineStart: '-0.25rem' }} />,
		label: 'אינסטגרם'
	},
	linkedin: {
		Icon: LinkedIn,
		label: 'לינקדאין'
	},
	twitter: {
		Icon: X,
		label: 'טוויטר'
	},
	pinterest: {
		Icon: Pinterest,
		label: 'פינטרסט'
	},
	youtube: {
		Icon: YouTube,
		label: 'יוטיוב'
	},
	tiktok: {
		Icon: TikTok,
		label: 'טיקטוק'
	},
	whatsapp: {
		Icon: WhatsApp,
		label: 'וואטסאפ'
	},
	phone: {
		Icon: Phone,
		label: 'טלפון'
	},
	email: {
		Icon: Email,
		label: 'אימייל'
	}
};

export default function Main() {
	const { qrSvgPath, content: { fullName, occupation, description, statement, links, video } } = useContext(PageContext);

	const saveContact = async () => createAndDownloadContact(fullName, occupation, links);

	const [contactModal, showContactModal] = useModal({
		onSubmit: (data) => xhr.postLead(data)
			.then(() => alert('אחלה, נשתמע!'))
			.catch(() => alert('שגיאת מערכת, נסו שוב מאוחר יותר.'))
	});
	const contactByForm = (interest) => showContactModal({ interest });

	const [sharingModal, showSharingModal] = useModal({
		qr: qrSvgPath
	});
	const sharePage = () => showSharingModal();

	const boxesContainerClassName = classNames(boxes, "px-2 mt-3");

	return <>
		<div className="px-4">
			<h1 className="title is-2">{fullName}</h1>
			<h2 className="subtitle is-4">{occupation}</h2>
			<p>{description}</p>
		</div>

		{!!Object.entries(links).length && <div className={boxesContainerClassName}>
			{Object.entries(links).map(([type, address]) => ({ type, address })).sort(byPlatform).map(({ type, address }) => {
				const { Icon, label } = copy[type];
				const href = hrefByAddressType(type, address);
				return <div key={address} className="box is-relative">
					<a href={href} target="_blank" rel="noreferrer">
						<Icon style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
						<span className="icon-text px-5 mx-3">{label}</span>
					</a>
				</div>;
			})}
		</div>}

		<div className={boxesContainerClassName}>
			<div className="box is-relative">
				<div onClick={saveContact} className="inner is-clickable">
					<AddContact style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">שמירת איש קשר</span>
				</div>
			</div>
		</div>

		<Video className="mt-6" />
		<Gallery className={video.url ? "mt-3" : "mt-6"} />

		<Sections {...{ contactByForm }} className="mt-6" />

		{statement?.content && <div className="px-4 py-3 mt-6 mb-5" style={{ backgroundColor: 'var(--color-primary-50)', borderInlineStart: '3px solid var(--color-primary-600)', borderInlineEnd: '3px solid transparent' }}>
			<p>{statement.author && '"'}{statement.content}{statement.author && '"'}</p>
			{statement.author && <span className="is-block has-text-end mt-2">- {statement.author}</span>}
		</div>}

		<div className={boxesContainerClassName}>
			<div className="box is-relative">
				<div onClick={sharePage} className="inner is-clickable">
					<Share style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">שיתוף העמוד</span>
				</div>
			</div>
		</div>

		<Modal {...contactModal} render={ContactForm} />

		<Modal {...sharingModal} render={SharingModal} />

	</>;
}

function byPlatform (a, b) {
	return Object.keys(copy).indexOf(a.type) - Object.keys(copy).indexOf(b.type);
}

function createAndDownloadContact(fullName, occupation, links) {

	const vCard = `BEGIN:VCARD\nVERSION:4.0\nFN:${fullName}\n${occupation ? `\nTITLE:${occupation}` : ''}${links.phone ? `\nTEL;TYPE=work,voice:${links.phone}` : ''}${links.email ? `\nEMAIL:${links.email}` : ''}\nURL:${window.location.origin + window.location.pathname}\nEND:VCARD`;

	const blob = new Blob([vCard], { type: "text/vcard" });

	const newLink = document.createElement('a');
	newLink.download = fullName.replaceAll(' ', '-') + ".vcf";
	newLink.textContent = `${fullName} - איש קשר`;
	newLink.href = URL.createObjectURL(blob);

	newLink.click();
}