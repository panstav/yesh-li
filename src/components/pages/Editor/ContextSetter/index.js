import { EditorContext, acceptedExtnames } from "@pages/Editor";
import Modal from "@wrappers/Modal";

import { useFieldLabels } from "@hooks/use-i18n";

import xhr from "@services/xhr";

import { useImageModals, useNavigation } from "./hooks";
import limitImageSize from "./limit-image-size";

export default function ContextSetter({ extend, children }) {
	const t = useFieldLabels();

	const { navigate, registerNavigation } = useNavigation();
	const { modals, showImageModal } = useImageModals();

	const ctx = {
		navigate,
		registerNavigation,
		uploadImage,
		imageModals: showImageModal,
		...extend
	};

	return <>
		<EditorContext.Provider value={ctx}>
			{children}
		</EditorContext.Provider>

		<Modal {...modals.supportedFileTyesModal} render={() => `${t.image_types_supported}: ${acceptedExtnames}`} />
		<Modal {...modals.moderationModal} render={t.ModerationInvalidatedModal} />
		<Modal {...modals.fileTypeMisname} render={t.ExtensionMatchesFileDoesNot} allowedTypes={acceptedExtnames} />
		<Modal {...modals.serverErrorModal} render={() => t.image_upload_error} />
	</>;

	async function uploadImage({ file, limit, sizes, slug }) {

		const { base64: imageBase64, width, height } = await limitImageSize(file, limit);

		if (!sizes) sizes = [Math.max(width, height)];

		return xhr.processImage({ imageBase64, fileName: file.name, sizes, siteSlug: slug }).catch((err) => {
			if (err.responseData?.reasoning === 'moderation') return showImageModal.showModeration();
			if (err.responseData?.reasoning === 'type-not-allowed') return showImageModal.showFileTypeMisname();
			showImageModal.showServerError();
			// let context method consume the error
			throw err;
		});
	}

}