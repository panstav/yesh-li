import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import { Email, Facebook, Instagram, LinkedIn, TikTok, WhatsApp, X, YouTube, Phone, Pinterest } from "@elements/Icon";

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

export default function Main () {
	const { content: { fullName, occupation, description, statement, links } } = useContext(PageContext);

	const boxesContainerClassName = classNames(boxes, "mt-3 px-2");

	return <>
		<div className="px-4">
			<h1 className="title is-2">{fullName}</h1>
			<h2 className="subtitle is-4">{occupation}</h2>
			<p>{description}</p>
		</div>

		{!!links.length && <div className={boxesContainerClassName}>
			{links.map(({ type, label, address }) => {
				const Icon = copy[type];
				return <div key={address} className="box is-relative">
					<a href={address} target="_blank" rel="noreferrer">
						<Icon style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
						<span className="icon-text px-5 mx-3">{label}</span>
					</a>
				</div>;
			})}
		</div>}

		<div className={boxesContainerClassName}>
			<div className="box is-relative">
				<a target="_blank" rel="noreferrer">
					<Email style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">אודותיי</span>
				</a>
			</div>
			<div className="box is-relative">
				<a target="_blank" rel="noreferrer">
					<Email style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">שירותיי</span>
				</a>
			</div>
			<div className="box is-relative">
				<a target="_blank" rel="noreferrer">
					<Email style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">צרו קשר</span>
				</a>
			</div>
		</div>

		{statement && <p className="has-background-white-bis my-5 py-3 px-4" style={{ borderInlineStart: '3px solid black', borderInlineEnd: '3px solid transparent' }}>
			<span>{statement.content}</span>
		</p>}
	</>;
}