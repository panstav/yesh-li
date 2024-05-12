import { createContext, useCallback, useContext, useState } from 'react';

import getDirByLang from '@lib/get-dir-by-lang';

import Auth from './Auth';
import Editor from './Editor';

export const EditorContext = createContext();
export const editorProps = {
	isInternal: true
};

export default function EditorWrapper ({ pageContext }) {
	const { forward, backward } = getDirByLang(pageContext.lang, { bothSides: true });
	return <Auth>
		<EditorContextHandler extend={{ dir: { forward, backward } }}>
			<Editor  />
		</EditorContextHandler>
	</Auth>;
}

export function PreviewLink({ href, onClick, children }) {

	const goTo = useContext(EditorContext).navigate;

	return <a onClick={navigate}>{children}</a>;

	function navigate(event) {
		event.preventDefault();
		onClick(event);
		goTo(href);
	}

}

function EditorContextHandler({ extend, children }) {
	const [navigate, setNavigate] = useState();

	const registerNavigation = useCallback((navigationFn) => {
		if (!navigate) return setNavigate(() => navigationFn);
	}, [navigate]);

	const ctx = Object.assign({ navigate, registerNavigation }, extend);

	return <EditorContext.Provider value={ctx}>
		{children}
	</EditorContext.Provider>;

}