import { Fragment, useContext } from "react";
import classNames from "classnames";

import Modal, { Title, useModal, useRawModal } from "@wrappers/Modal";
import { Faq, Gift, Person } from "@elements/Icon";

import { PageContext } from "@config/Page";

import { boxes, summary } from "./main.module.sass";

export default function Sections({ contactByForm, className }) {
	const { content: { about, sections, faq } } = useContext(PageContext);

	const [aboutModal, showAboutModal] = useModal({
		title: 'אודותיי'
	});
	const [servicesModal, showServicesModal] = useRawModal();
	const [faqModal, showFaqModal] = useRawModal();

	const boxesClassName = classNames(boxes, "px-2", className);

	return <>

		<div className={boxesClassName}>
			{about && <div className="box is-relative">
				<div onClick={() => showAboutModal()} className="inner is-clickable">
					<Person style={{ width: '1.25rem', position: 'absolute', insetInlineStart: '0.85rem' }} />
					<span className="icon-text px-5 mx-3">אודות</span>
				</div>
			</div>}
			{!!sections?.length && <div className="box is-relative">
				<div onClick={() => showServicesModal()} className="inner is-clickable">
					<Gift style={{ width: '1rem', position: 'absolute', insetInlineStart: '1rem' }} />
					<span className="icon-text px-5 mx-3">שירותים</span>
				</div>
			</div>}
			{!!faq?.length && <div className="box is-relative">
				<div onClick={() => showFaqModal()} className="inner is-clickable">
					<Faq style={{ width: '1.25rem', position: 'absolute', insetInlineStart: '0.85rem' }} />
					<span className="icon-text px-5 mx-3">שאלות נפוצות</span>
				</div>
			</div>}
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

		<Modal {...faqModal} render={() => {
			const summaryClassName = classNames(summary, "ps-4 py-4 me-4");
			return <div className="has-background-white has-radius">
				{faq.map(({ question, answer }, index) => {
					return <Fragment key={question}>
						{index !== 0 && <hr className="m-0" />}
						<details className="details">
							<summary className={summaryClassName}>
								<Title isMarginless style={{ maxWidth: 'calc(100% - 2.5em)' }}>{question}</Title>
							</summary>
							<div className="px-4 pb-4" dangerouslySetInnerHTML={{ __html: answer }} />
						</details>
					</Fragment>;
				})}
			</div>;
		}} />

	</>;
}