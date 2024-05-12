import { Confirm, Error } from '@elements/Icon';

import { Title } from './Modal';

import { modalContent, rawModalInner } from './modal.module.sass';

export function RawModal({ hideable, hideModal, noCloseButton, children, isLarge }) {
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

export function RegularModal({ title, hideable, noCloseButton, hideModal, children }) {
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

export function ErrorModal(props) {
	return <SimpleModal {...props} Icon={(props) => <Error {...props} className="has-text-danger" />} />;
}

export function SuccessModal(props) {
	return <SimpleModal {...props} Icon={(props) => <Confirm {...props} className="has-text-success" />} />;
}

function SimpleModal({ Icon, children, ...props }) {
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