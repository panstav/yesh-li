import { createContext, useCallback, useContext, useRef } from 'react';

import Details from '@elements/Details';

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

export default function EditorWrapper({ pageContext, adminOnly, domainControl }) {
	const { forward, backward } = getDirByLang(pageContext.lang, { bothSides: true });
	return <Auth adminOnly={adminOnly}>
		<EditorContextSetter extend={{ domainControl, dir: { forward, backward } }}>
			<Editor  />
		</EditorContextSetter>
	</Auth>;
}

export function LinkedDetails({ title, href, children }) {
	if (!href) throw new Error('LinkedDetails must have an href prop');

	const ref = useRef();

	const onClick = useCallback((event) => {
		// when clicking on details title, don't close details, but open if closed
		if (ref.current && ref.current.open) event.stopPropagation();
	}, [ref]);

	return <Details detailsRef={ref} title={() => <PreviewLink {...{ onClick, href }}>{title}</PreviewLink>}>
		{children}
	</Details>;
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

function PreviewLink({ href, onClick, children }) {
	const goTo = useContext(EditorContext).navigate;

	const navigate = (event) => {
		event.preventDefault();
		onClick(event);
		goTo(href);
	};

	return <a onClick={navigate}>{children}</a>;
}