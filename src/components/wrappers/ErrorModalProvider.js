import { ErrorBoundary } from "react-error-boundary";

import useI18n from "@hooks/use-i18n";

import { SafeHeader } from "@pages/Editor/Header";

import Modal, { useErrorModal } from "./Modal";

export default function ErrorModalProvider({ children }) {
	const [{ multi: { FatalErrorModal } }] = useI18n();

	const [fatalErrorModalProps, showFatalErrorModal] = useErrorModal({ hideable: false });

	return <>
		<ErrorBoundary FallbackComponent={SafeHeader} onError={(error) => showFatalErrorModal({ error })}>
			{children}
		</ErrorBoundary>

		<Modal {...fatalErrorModalProps} render={FatalErrorModal} />
	</>;
}