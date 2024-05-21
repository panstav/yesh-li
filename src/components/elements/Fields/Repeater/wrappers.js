import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import useI18n from "@hooks/use-i18n";

import Modal, { SaveButton, useModal } from "@wrappers/Modal";
import Details from "@elements/Details";
import Loader from "@elements/Loader";

import markErrorOnClosestDetails from "@lib/mark-error-on-closest-details";

import { fieldsContainer, compoundField, repeaterItemTitle } from "@pages/Editor/index.module.sass";

import Buttons from "./Buttons";

export function ModalizedRepeaterItem({ title, itemId, arrayId, previewPath, children }) {

	const [{ misc: t }] = useI18n();
	const { getFieldState } = useFormContext();

	const ref = useRef();

	const itemHasErrors = !!getFieldState(itemId).error;
	const arrayHasErrors = !!getFieldState(arrayId).error;
	useEffect(() => {
		if (ref.current) markErrorOnClosestDetails(ref.current, arrayHasErrors, true);
	}, [arrayHasErrors, ref]);

	const [repeaterItemModal, showModal] = useModal({ blurBackground: true });

	const titleWrapperClassName = classNames(repeaterItemTitle, 'is-clickable', itemHasErrors && 'has-text-danger');

	return <>
		<TitleWithButtons
			{...{ title, previewPath }}
			wrapperRef={ref}
			onClick={() => showModal()}
			className={titleWrapperClassName} />

		<Modal {...repeaterItemModal} noCloseButton render={({ hideModal }) => <div className={fieldsContainer}>
			{children}
			<SaveButton onClick={hideModal}>{t.continue}</SaveButton>
		</div>} />
	</>;
}

export function CollapsedRepeaterItem({ title, itemId, previewPath, children, ...props }) {

	const { getFieldState } = useFormContext();

	const titleWrapperClassName = getFieldState(itemId).error ? 'has-text-danger' : '';

	const Title = () => <TitleWithButtons {...{ title, previewPath }} className={titleWrapperClassName} titleProps={{ ['data-avoid-closing-details']: true }} />;

	return <Details title={Title} {...props}>
		{children}
	</Details>;
}

export function NoWrapper({ children }) {
	return <div className={compoundField}>
		{children}
	</div>;
}

function TitleWithButtons({ title, wrapperRef, className: classes, onClick, previewPath, titleProps }) {
	const className = classNames("is-flex is-justify-content-space-between is-align-items-center pe-5", classes);
	return <div ref={wrapperRef} className={className} onClick={onClick}>
		<h3 className="is-size-5 m-0 has-text-wrap-ellipsis" {...titleProps}>
			{title || "Untitled"}
		</h3>
		<Buttons onlyOnHover withGoTo={previewPath} />
	</div>;
}