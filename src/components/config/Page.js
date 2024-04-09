import { createContext, createElement } from 'react';
import { ErrorBoundary } from "react-error-boundary";

import { SafeHeader } from '@pages/Editor/Header';
import Modal, { useErrorModal } from '@wrappers/Modal';
import OutboundLink from '@elements/OutboundLink';

export const PageContext = createContext();

export default function Page({ pageContext, background, children }) {

	const [fatalErrorModalProps, showFatalErrorModal] = useErrorModal({ hideable: false });

	return <PageContext.Provider value={pageContext}>

		<ErrorBoundary FallbackComponent={SafeHeader} onError={(error) => showFatalErrorModal({ error })}>
			<Background {...{ background }} />
			{children}
		</ErrorBoundary>

		<div id="modal-root" />

		<Modal {...fatalErrorModalProps} render={({ error }) => <>
			<div className='block content has-text-start mt-5'>
				<p>נתקלנו בשגיאת מערכת.<br />השגיאה שוגרה למערכת לבדיקה ותתוקן בהקדם האפשרי.</p>
				<p>ניתן לנסות לרענן את הדף ולנסות שוב. אם השגיאה חוזרת - כדאי לפנות לתמיכה.</p>
			</div>

			<div className='buttons has-addons is-centered'>
				<button className='button' onClick={() => window.location.reload()}>לרענן את הדף</button>
				<OutboundLink className='button' href={`mailto:hello@yesh.li?subject=שגיאת מערכת ב-יש.לי&body=נתקלתי בשגיאה הזו:%0D%0A%0D%0A${error.stack.replaceAll('\n', '%0D%0A')}`}>לפנות לתמיכה</OutboundLink>
			</div>
		</>} />

	</PageContext.Provider>;
}

export function wrapPageElement({ element, props }) {
	return createElement(Page, {
		// downstream props
		...props,
		// a reminiscence of the old code, required for shila's theme
		...element.type.config,
	}, element);
}

function Background({ background: url }) {
	if (!url) return null;
	return <div style={{ zIndex: '-10', position: 'fixed', top: '-50%', left: '-50%', width: '200%', height: '200%' }}>
		<img style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', minWidth: '50%', maxWidth: 'none', minHeight: '50%' }} src={url} />
	</div>;
}