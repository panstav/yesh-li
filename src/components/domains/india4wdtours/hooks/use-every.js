import { useEffect } from "react";

/**
 * Custom hook that executes a callback function at a specified interval.
 *
 * @param {Function} callback - The callback function to be executed.
 * @param {number} interval - The interval (in milliseconds) at which the callback should be executed.
 */

export default function useEvery(callback, interval) {
	useEffect(() => {
		const intervalId = setInterval(callback, interval);
		return () => clearInterval(intervalId);
	}, []);
}