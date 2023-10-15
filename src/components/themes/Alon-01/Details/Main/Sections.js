import { useContext } from "react";
import classNames from "classnames";

import { PageContext } from "@config/Page";
import Modal, { Title, useModal } from "@wrappers/Modal";
import { Email, Gift, Person } from "@elements/Icon";

import { boxes } from "./main.module.sass";

export default function Sections({ contactByForm, className }) {
	const { content: { about, sections } } = useContext(PageContext);

	const [aboutModal, showAboutModal] = useModal({
		title: 'אודותיי'
	});
	const [servicesModal, showServicesModal] = useModal({
		isRaw: true
	});

	const boxesClassName = classNames(boxes, "px-2", className);

	return <>

		<div className={boxesClassName}>
			{about && <div className="box is-relative">
				<div onClick={() => showAboutModal()} className="inner is-clickable">
					<Person style={{ width: '1.25rem', position: 'absolute', insetInlineStart: '0.85rem' }} />
					<span className="icon-text px-5 mx-3">אודות</span>
				</div>
			</div>}
			{!!sections.length && <div className="box is-relative">
				<div onClick={() => showServicesModal()} className="inner is-clickable">
					<Gift style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">שירותים</span>
				</div>
			</div>}
			<div className="box is-relative">
				<div onClick={() => contactByForm()} className="inner is-clickable">
					<Email style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">צרו קשר</span>
				</div>
			</div>
		</div>

		<Modal {...aboutModal} render={() => {
			return <div className="content" dangerouslySetInnerHTML={{ __html: about }} />;
		}} />

		<Modal {...servicesModal} render={() => {
			return sections.map(({ id, ctaText, color, title, content }, index) => {
				const sectionClassName = classNames("box px-4 pt-4 pb-5", index && "mt-4", index !== sections.length - 1 && 'mb-4');
				return <div key={id} className={sectionClassName} style={{ borderInlineStart: `3px solid var(--color-${color})` }}>
					<Title>{title}</Title>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<button onClick={() => contactByForm(title)} className="button mt-3" style={{ backgroundColor: `var(--color-${color}-300)` }}>{ctaText}</button>
				</div>;
			});
		}} />

	</>;
}