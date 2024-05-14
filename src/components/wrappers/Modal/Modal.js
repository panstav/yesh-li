import classNames from 'classnames';

import useKeyPress from '@hooks/use-key-press';

import { modalBackground, modal } from './modal.module.sass';
import { ErrorModal, RawModal, RegularModal, SuccessModal } from './Body';

const modalTypes = {
	default: RegularModal,
	raw: RawModal,
	error: ErrorModal,
	success: SuccessModal
};

export default function Modal({ type = 'default', title, hideModal: hideModalProp, hideable = true, noCloseButton, isLarge, children }) {

	const hideModal = !hideable ? () => {} : hideModalProp;

	useKeyPress('Escape', hideModal);

	const ModalContent = modalTypes[type];

	return <div className={modal}>
		<div className={modalBackground} onClick={hideModal} style={{ opacity: '0.75' }}/>
		<ModalContent {...{ title, hideable, hideModal, noCloseButton, isLarge, children }} />
	</div>;
}

export function Title({ isMarginless, className: classes, style, children }) {
	const className = classNames('title is-4 is-flex is-align-items-center has-text-grey', isMarginless || 'mb-4', classes);
	return <div {...{ className, style }}>{children}</div>;
}

export function ContextTitle({ children }) {
	return <div className="has-text-grey-light has-text-weight-bold mb-3 text-wrap">
		{children}
	</div>;
}

export function SaveButton({ className: classes, onClick, children }) {
	const buttonClassName = classNames('button is-primary', classes);
	return <div className='is-flex is-justify-content-end'>
		<button className={buttonClassName} onClick={onClick}>{children}</button>
	</div>;
}