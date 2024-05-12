import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { themesMap } from "@themes";
import { EditorContext } from "@pages/Editor";

export default function useNavigationWorkaround({ theme }) {

	const { registerNavigation } = useContext(EditorContext);

	const [renderAllowed, setRenderAllowed] = useState(true);
	const [framePath, setFramePath] = useState();

	const frameRef = useRef();

	const navigate = useCallback((pathname) => {
		// fix undefined pathname bug due to race condition
		if (!pathname) return;

		const mapKey = pathname === '/' ? '' : pathname;
		const comp = themesMap[`${theme}${mapKey}`];

		const currentPath = frameRef.current?.dataset.path;

		// only navigate if
		if (
			// pathname starts with a slash - it's a valid path
			!pathname.startsWith('/')
			// the component exists
			|| !comp
			// next path is different from the current path
			|| pathname === currentPath
			// ^- next and current path aren't the homepage
			|| mapKey === currentPath
		) return;

		setFramePath(mapKey);
		setRenderAllowed(false);
	}, []);
	useEffect(() => registerNavigation(navigate), []);

	useEffect(() => {
		if (!renderAllowed) setRenderAllowed(true);
	}, [renderAllowed]);

	useEffect(() => {
		let listener;

		// set on load event
		if (frameRef.current) {
			listener = frameRef.current.addEventListener('load', () => {
				navigate(frameRef.current?.contentWindow?.location?.pathname);
			});
		}

		return () => frameRef?.current?.removeEventListener('load', listener);
	}, [frameRef.current, framePath]);

	return { framePath, frameRef, renderAllowed, navigate };

}