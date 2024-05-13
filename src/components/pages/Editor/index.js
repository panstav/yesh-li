import { createContext, useContext } from 'react';

import getDirByLang from '@lib/get-dir-by-lang';

import Auth from './Auth';
import Editor from './Editor';
import EditorContextSetter from './ContextSetter';

export const EditorContext = createContext();
export const editorProps = { isInternal: true };

export const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
export const acceptedFileSuffixes = allowedImageTypes.join(',').replaceAll('image/', '.');
export const acceptedExtnames = allowedImageTypes.join(', ').replaceAll('image/', '.');

export default function EditorWrapper ({ pageContext }) {
	const { forward, backward } = getDirByLang(pageContext.lang, { bothSides: true });
	return <Auth>
		<EditorContextSetter extend={{ dir: { forward, backward } }}>
			<Editor  />
		</EditorContextSetter>
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