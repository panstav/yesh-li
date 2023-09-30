import { useCallback, useEffect, useState } from 'react';

export default function useModal(propsFromHook = {}) {

	const [modalProps, setModalProps] = useState();
	const hideModal = () => {
		window.document.body.classList.toggle('with-modal', false);
		return setModalProps();
	};

	const [location, setLocation] = useState();
	const [prevLocation, setPrevLocation] = useState();
	useEffect(() => {
		const listener = window.addEventListener('popstate', () => setLocation(window.location.href));
		return () => window.removeEventListener('popstate', listener);
	}, []);

	useEffect(() => {
		if (location !== prevLocation) {
			hideModal();
			setPrevLocation(location);
		}
	}, [location, !!modalProps]);

	const showModal = useCallback((propsFromCallback = {}) => {
		const newProps = Object.assign({ hideModal },
			typeof propsFromHook === 'function'
				? propsFromHook(propsFromCallback)
				: Object.assign(propsFromHook, propsFromCallback)
		);
		window.document.body.classList.toggle('with-modal', true);
		setModalProps(newProps);
	}, [typeof propsFromHook]);

	return [modalProps, showModal, hideModal];
}