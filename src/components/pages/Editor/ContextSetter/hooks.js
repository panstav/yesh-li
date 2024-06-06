import { useCallback, useState } from "react";

import { useErrorModal } from "@wrappers/Modal";

export function useImageModals() {
	const [supportedFileTyesModal, showSupportedFileTyes] = useErrorModal();
	const [moderationModal, showModeration] = useErrorModal();
	const [fileTypeMisname, showFileTypeMisname] = useErrorModal();
	const [serverErrorModal, showServerError] = useErrorModal();

	return { modals: { supportedFileTyesModal, moderationModal, fileTypeMisname, serverErrorModal }, showImageModal: { showSupportedFileTyes, showModeration, showFileTypeMisname, showServerError } };
}

export function useNavigation() {
	const [currentPath, setCurrentPath] = useState();
	const [navigate, setNavigate] = useState();
	const navigateHandler = (path) => {
		setCurrentPath(path);
		navigate(path);
	};

	const registerNavigation = useCallback((navigationFn) => {
		if (!navigate) return setNavigate(() => navigationFn);
	}, [navigate]);

	return { currentPath, registerNavigation, navigate: navigateHandler };
}