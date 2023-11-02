import { useCallback, useEffect, useState } from 'react';
import { useFrame } from 'react-frame-component';

export default function useModal(propsFromHook = {}) {
	const { window } = useFrame();

	const [modalProps, setModalProps] = useState();

	const hideModal = (event) => {
		window.document.documentElement.classList.toggle('with-modal', false);
		// unless the modal is being closed by the browser's back button - go back
		if (event?.type !== 'popstate') history.back();
		return setModalProps();
	};

	const hideModalById = useCallback((event) => {
		// the modal is being closed by the browser's back button
		// ensure that the modal being closed is the one that was opened last
		if (modalProps?.modalId && (event?.state?.modalId === modalProps?.modalId)) hideModal(event);
	}, [modalProps, hideModal]);

	useEffect(() => {
		if (!modalProps?.modalId) return;
		window.addEventListener('popstate', hideModalById);
		return () => window.removeEventListener('popstate', hideModalById);
	}, [hideModalById, modalProps?.modalId]);

	const showModal = useCallback((propsFromCallback = {}) => {
		const modalId = Math.random().toString(36).slice(2);
		const newProps = Object.assign({ hideModal, modalId },
			typeof propsFromHook === 'function'
				? propsFromHook(propsFromCallback)
				: Object.assign(propsFromHook, propsFromCallback)
		);
		window.document.documentElement.classList.toggle('with-modal', true);
		// this is to identify the modal so that if 2 are open and the user triggers hideModal - it wouldn't close both
		history.replaceState({ modalId }, '');
		history.pushState({}, '');
		setModalProps(newProps);
	}, [typeof propsFromHook]);

	return [modalProps, showModal, hideModal];

}

export const useRawModal = modalType('raw');
export const useErrorModal = modalType('error');
export const useSuccessModal = modalType('success');

function modalType (type) {
	return (propsFromHook = {}) => {

		if (typeof propsFromHook === 'function') return useModal((propsFromCallback) => ({
			type,
			...propsFromHook(propsFromCallback)
		}));

		return useModal({
			type,
			...propsFromHook
		});

	};
}