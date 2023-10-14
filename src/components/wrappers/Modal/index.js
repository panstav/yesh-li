import { createPortal } from 'react-dom';
import { useFrame } from 'react-frame-component';

import ComponentWithForm from './Form';
import Component, { Title, ContextTitle } from './Modal';

export { default as useModal } from './use-modal';

export { Title, ContextTitle };

export default function Modal({ modalId, ...props }) {
	const { document } = useFrame();

	// if we don't have a modalId - don't render anything - the modal is closed
	if (!modalId) return null;

	if ([props, ...Object.values(props)].some((prop) => prop?.nativeEvent?.view === window)) console.error('Open modal with an event by passing a wrapped openModal function to the event handler (e.g. onClick={() => openModal()}), not by calling it directly (e.g. onClick={openModal})');

	return createPortal(<ModalOrFormOnModal {...props} />, document.getElementById('modal-root'));
}

function ModalOrFormOnModal({ render, hideModal, isRaw, isLarge, confirmBeforeHiding, ...modalProps }) {

	if (modalProps.onSubmit) return <ComponentWithForm {...{ render, hideModal, isRaw, isLarge, confirmBeforeHiding, ...modalProps }} />;

	const props = {
		title: modalProps.title,
		hideModal,
		isRaw, isLarge,
		children: render({ hideModal, ...modalProps })
	};

	return <Component {...props} />;

}