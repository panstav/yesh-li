import { useEffect } from "react";
import { useFrame } from "react-frame-component";

export default function useKeyPress(targetKey, callback) {
	const { window } = useFrame();

	const handler = ({ key }) => {
		if (key === targetKey) callback();
	};

	useEffect(() => {
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [callback]);
}