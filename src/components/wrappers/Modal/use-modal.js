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

	useEffect(() => {
		window.addEventListener('popstate', hideModal);
		return () => window.removeEventListener('popstate', hideModal);
	}, []);

	const showModal = useCallback((propsFromCallback = {}) => {
		const newProps = Object.assign({ hideModal },
			typeof propsFromHook === 'function'
				? propsFromHook(propsFromCallback)
				: Object.assign(propsFromHook, propsFromCallback)
		);
		window.document.documentElement.classList.toggle('with-modal', true);
		history.pushState({}, '');
		setModalProps(newProps);
	}, [typeof propsFromHook]);

	return [modalProps, showModal, hideModal];
}