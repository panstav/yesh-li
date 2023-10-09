import useKeyPress from '@hooks/use-key-press';

import { modalBackground, modal, modalContent, rawModalInner } from './modal.module.sass';

export default function Modal({ title, hideModal: hideModalProp, hideable = true, isRaw, isLarge, children }) {

	const hideModal = !hideable ? () => {} : hideModalProp;

	useKeyPress('Escape', hideModal);

	const ModalContent = isRaw ? RawModal : RegularModal;

	return <div className={modal}>
		<div className={modalBackground} onClick={hideModal} style={{ backgroundColor: 'var(--color-primary-900)', opacity: '0.75' }}/>
		<ModalContent {...{ title, hideable, hideModal, isLarge, children }} />
	</div>;
}

function RawModal({ hideable, hideModal, children, isLarge }) {
	return <div className={modalContent} style={isLarge ? { width: '100%', maxHeight: 'unset' } : {}}>
		<div style={{ maxHeight: '100%', overflowY: 'auto' }}>
			{hideable && <div onClick={hideModal} className='is-flex is-overlay is-clickable' style={{ insetInlineStart: 'unset', bottom: 'unset', zIndex: 100 }}>
				<div className="delete is-large" style={{ margin: '0.25rem' }} />
			</div>}
			<div className={rawModalInner}>
				{children}
			</div>
		</div>
	</div>;
}

function RegularModal({ title, hideable, hideModal, children }) {
	return <div className={modalContent}>
		<div className="box p-0" style={{ maxHeight: '100%', overflowY: 'auto' }}>

			{hideable && <div onClick={hideModal} className='is-flex is-overlay is-clickable p-1' style={{ insetInlineStart: 'unset', bottom: 'unset' }}>
				<div className="delete" />
			</div>}

			<div className='box-inner'>

				{title && <Title>{title}</Title>}
				{children}

			</div>

		</div>
	</div>;
}

export function Title ({ children }) {
	return <div className="title is-3 is-flex is-align-items-center has-text-grey">{children}</div>;
}

export function ContextTitle ({ children }) {
	return <div className="has-text-grey-light has-text-weight-bold mb-3 text-wrap">
		{children}
	</div>;
}