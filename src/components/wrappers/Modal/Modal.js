import classNames from 'classnames';

import { Confirm, Error } from '@elements/Icon';
import useKeyPress from '@hooks/use-key-press';

import { modalBackground, modal, modalContent, rawModalInner } from './modal.module.sass';

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

export function SaveButton({ className: classes, children }) {
	const buttonClassName = classNames('button is-primary', classes);
	return <div className='is-flex is-justify-content-end'>
		<button className={buttonClassName}>{children}</button>
	</div>;
}

function RawModal({ hideable, hideModal, noCloseButton, children, isLarge }) {
	return <div className={modalContent} style={isLarge ? { width: '100%', maxHeight: 'unset' } : {}}>
		<div style={{ maxHeight: '100%', overflowY: 'auto' }}>
			{hideable && !noCloseButton && <div onClick={hideModal} className='is-flex is-overlay is-clickable' style={{ insetInlineStart: 'unset', bottom: 'unset', zIndex: 100 }}>
				<div className="delete is-large" style={{ margin: '0.25rem' }} />
			</div>}
			<div className={rawModalInner}>
				{children}
			</div>
		</div>
	</div>;
}

function RegularModal({ title, hideable, noCloseButton, hideModal, children }) {
	return <div className={modalContent}>
		<div className="box p-0" style={{ maxHeight: '100%', overflowY: 'auto' }}>

			{hideable && !noCloseButton && <div onClick={hideModal} className='is-flex is-overlay is-clickable p-1' style={{ insetInlineStart: 'unset', bottom: 'unset' }}>
				<div className="delete" />
			</div>}

			<div className='box-inner'>

				{title && <Title>{title}</Title>}
				{children}

			</div>

		</div>
	</div>;
}

function SimpleModal ({ Icon, children, ...props }) {
	return <RegularModal {...props}>
		<div className="has-text-centered py-4">
			<div className='mb-2'>
				<Icon style={{ width: '6rem', height: 'auto' }} />
			</div>
			<span className='is-size-5'>
				{children}
			</span>
		</div>
	</RegularModal>;
}

function ErrorModal(props) {
	return <SimpleModal {...props} Icon={(props) => <Error {...props} className="has-text-danger" />} />;
}

function SuccessModal(props) {
	return <SimpleModal {...props} Icon={(props) => <Confirm {...props} className="has-text-success" />} />;
}