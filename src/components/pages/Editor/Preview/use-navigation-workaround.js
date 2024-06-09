import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { EditorContext } from "@pages/Editor";

import { domainsMap } from "@domains";
import { themesMap } from "@themes";

export default function useNavigationWorkaround({ domain, theme }) {

	const { domainControl, registerNavigation } = useContext(EditorContext);

	const [renderAllowed, setRenderAllowed] = useState(true);
	const [framePath, setFramePath] = useState();

	const frameRef = useRef();

	const navigate = useCallback((pathname) => {
		// fix undefined pathname bug due to race condition
		if (!pathname) return;

		const mapKey = pathname === '/' ? '' : pathname;
		const comp = domainControl
			? domainsMap[`${domain}${mapKey}`]
			: themesMap[`${theme}${mapKey}`];

		// don't navigate if
		if (
			// pathname doesn't start with a slash - it's not a valid path
			!pathname.startsWith('/')
			// the component doesn't exists
			|| !comp
		) return;

		setFramePath(mapKey);
		setRenderAllowed(false);
	}, []);

	useEffect(() => registerNavigation(navigate), []);

	useEffect(() => {
		if (!renderAllowed) setRenderAllowed(true);
	}, [renderAllowed]);

	useEffect(() => {
		if (!frameRef.current) return;

		// whenever the user navigates within the iframe, it normally loads the page that was navigated to
		// but we want a controlled navigation so we'll use our own navigate function
		const listener = frameRef.current.addEventListener('load', () => {
			navigate(frameRef.current?.contentWindow?.location?.pathname);
		});

		return () => frameRef?.current?.removeEventListener('load', listener);
	}, [frameRef.current, framePath]);

	return { framePath, frameRef, renderAllowed, navigate };

}