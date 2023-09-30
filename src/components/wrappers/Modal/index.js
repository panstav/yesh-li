import { createPortal } from 'react-dom';

import ComponentWithForm from './Form';
import Component, { Title, ContextTitle } from './Modal';

export { default as useModal } from './use-modal';

export { Title, ContextTitle };

export default function Modal({ render, hideModal, ...props }) {
	if (!Object.keys(props).length) return null;
	return createPortal(<ModalOrFormOnModal {...props} {...{ render, hideModal }} />, document.getElementById('modal-root'));
}

function ModalOrFormOnModal({ render, hideModal, ...modalProps }) {

	if (modalProps.onSubmit) return <ComponentWithForm {...{ render, hideModal, ...modalProps }} />;

	const props = {
		title: modalProps.title,
		hideModal,
		children: render({ hideModal, ...modalProps })
	};

	return <Component {...props} />;

}