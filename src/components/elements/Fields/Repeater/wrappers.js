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

export function ModalizedRepeaterItem({ title, itemId, arrayId, expandItem, previewPath, children }) {

	const [{ misc: t }] = useI18n();
	const { getFieldState } = useFormContext();

	const [isPending, setIsPending] = useState(false);

	const ref = useRef();

	const itemHasErrors = !!getFieldState(itemId).error;
	const arrayHasErrors = !!getFieldState(arrayId).error;
	useEffect(() => {
		if (ref.current) markErrorOnClosestDetails(ref.current, arrayHasErrors, true);
	}, [arrayHasErrors, ref]);

	const [repeaterItemModal, showModal] = useModal({ blurBackground: true });
	const showModalHandler = async () => {
		if (!expandItem) return showModal();
		setIsPending(true);
		await expandItem(itemId);
		showModal();
		setIsPending(false);
	};

	const titleWrapperClassName = classNames(repeaterItemTitle, 'is-clickable', itemHasErrors && 'has-text-danger');

	return <>
		<TitleWithButtons
			{...{ title, previewPath }}
			isLoading={isPending}
			wrapperRef={ref}
			onClick={showModalHandler}
			className={titleWrapperClassName} />

		<Modal {...repeaterItemModal} noCloseButton render={({ hideModal }) => <div className={fieldsContainer}>
			{children}
			<SaveButton onClick={hideModal}>{t.continue}</SaveButton>
		</div>} />
	</>;
}

export function CollapsedRepeaterItem({ title, itemId, expandItem, previewPath, children, ...props }) {

	const { getFieldState } = useFormContext();

	const titleWrapperClassName = getFieldState(itemId).error ? 'has-text-danger' : '';

	const Title = () => <TitleWithButtons {...{ title, previewPath }} className={titleWrapperClassName} titleProps={{ ['data-avoid-closing-details']: true }} />;

	return <Details title={Title} onPreOpen={expandItem} {...props}>
		{children}
	</Details>;
}

export function NoWrapper({ expandItem, children }) {
	if (expandItem) throw new Error("expandItem is not supported with the default wrapper");

	return <div className={compoundField}>
		{children}
	</div>;
}

function TitleWithButtons({ title, wrapperRef, isLoading, className: classes, onClick, previewPath, titleProps }) {
	const className = classNames("is-flex is-justify-content-space-between is-align-items-center pe-5", classes);
	return <div ref={wrapperRef} className={className} onClick={onClick}>
		<h3 className="is-size-5 m-0 has-text-wrap-ellipsis" {...titleProps}>
			{isLoading && <span className="is-relative is-inline-block" style={{ width: '1rem', height: '1rem', marginInlineEnd: '0.5rem' }}><Loader /></span>}
			{title || "Untitled"}
		</h3>
		<Buttons onlyOnHover withGoTo={previewPath} />
	</div>;
}