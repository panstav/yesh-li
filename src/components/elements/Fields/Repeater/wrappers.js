import classNames from "classnames";

import useI18n from "@hooks/use-i18n";

import Details from "@elements/Details";
import Modal, { SaveButton, useModal } from "@wrappers/Modal";

import { fieldsContainer, compoundField, repeaterItemTitle } from "@pages/Editor/index.module.sass";

import Buttons from "./Buttons";

export function ModalizedRepeaterItem({ title, children }) {
	const [{ misc: t }] = useI18n();

	const [repeaterItemModal, showModal] = useModal({ blurBackground: true });

	const titleWrapperClassName = classNames(repeaterItemTitle, 'is-clickable');

	return <>
		<TitleWithButtons
			title={title}
			onClick={() => showModal()}
			className={titleWrapperClassName} />

		<Modal {...repeaterItemModal} noCloseButton render={({ hideModal }) => <div className={fieldsContainer}>
			{children}
			<SaveButton onClick={hideModal}>{t.continue}</SaveButton>
		</div>} />
	</>;
}

export function CollapsedRepeaterItem({ title, children, ...props }) {
	const Title = () => <TitleWithButtons title={title} titleProps={{ ['data-avoid-closing-details']: true }} />;
	return <Details title={Title} {...props}>
		{children}
	</Details>;
}

export function NoWrapper({ children }) {
	return <div className={compoundField}>
		{children}
	</div>;
}

function TitleWithButtons({ title, className: classes, onClick, titleProps }) {
	const className = classNames("is-flex is-justify-content-space-between is-align-items-center pe-5", classes);
	return <div className={className} onClick={onClick}>
		<h3 className="is-size-5 m-0 has-text-wrap-ellipsis" {...titleProps}>{title}</h3>
		<Buttons onlyOnHover />
	</div>;
}