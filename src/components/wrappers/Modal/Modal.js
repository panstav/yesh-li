import { useEffect } from 'react';

import { modalBackground, modal, modalContent } from './modal.module.sass';

export default function Modal({ title, hideModal: hideModalProp, children, hideable = true }) {

	const hideModal = !hideable ? () => {} : hideModalProp;

	useEscape(hideModal);

	return <div className={modal}>
		<div className={modalBackground} onClick={hideModal}/>
		<div className={modalContent}>
			<div className="box p-0" style={{ maxHeight: '100%', overflowY: 'auto' }}>

				{hideable && <div onClick={hideModal} className='is-flex is-overlay is-clickable p-1' style={{ insetInlineStart: 'unset', bottom: 'unset' }}>
					<div className="delete" />
				</div>}

				<div className="box-inner">

					{title && <Title>{title}</Title>}
					{children}

				</div>

			</div>
		</div>
	</div>;
}

export function Title ({ children }) {
	return <div className="title is-3 is-flex is-align-items-center has-text-grey">{children}</div>;
}

export function ContextTitle ({ children }) {
	return <div className="has-text-grey-light has-text-weight-bold mb-3 text-wrap">
		{children}
	</div>;
}

function useEscape(fn) {

	useEffect(() => {
		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, []);

	function closeOnEscape(event) {
		if (event.key === 'Escape') fn();
	}

}