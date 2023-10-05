import { navigate } from "gatsby";
import { useEffect } from 'react';

export default function RedirectToRoot({ pageContext: { redirect } }) {

	// redirect to domain of this site
	useEffect(() => navigate(redirect, { replace: true }), []);

	return null;
}