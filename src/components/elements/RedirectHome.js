import { navigate } from "gatsby";
import { useEffect } from 'react';

export default function RedirectHome() {

	// redirect to homepage
	useEffect(() => navigate('/'), []);

	return null;
}