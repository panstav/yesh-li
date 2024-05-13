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
	const [navigate, setNavigate] = useState();

	const registerNavigation = useCallback((navigationFn) => {
		if (!navigate) return setNavigate(() => navigationFn);
	}, [navigate]);

	return { navigate, registerNavigation };
}