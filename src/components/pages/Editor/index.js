import { createContext, useContext } from 'react';

import getDirByLang from '@lib/get-dir-by-lang';

import Auth from './Auth';
import Editor from './Editor';
import EditorContextSetter from './ContextSetter';

import './index.sass';

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

	const navigate = (event) => {
		event.preventDefault();
		onClick(event);
		goTo(href);
	};

	return <a onClick={navigate}>{children}</a>;
}

const tempIdKey = '_id';
export const tempIds = {
	key: tempIdKey,
	get: ({ [tempIdKey]: id }) => id,
	set: addTempId,
	setAll: iterateAnd(addTempId),
	unsetAll: iterateAnd(removeTempId)
};

function iterateAnd(fn) {
	return (complex) => {
		return iterate(complex);
		function iterate(obj) {
			Object.keys(obj).forEach((key) => {
				if (Array.isArray(obj[key])) obj[key] = obj[key].map(fn);
				if (typeof obj[key] === 'object') iterate(obj[key]);
			});
			return obj;
		}
	};
}
function addTempId(item) {
	item[tempIdKey] = String(Math.random());
	return item;
}
function removeTempId(item) {
	delete item[tempIdKey];
	return item;
}