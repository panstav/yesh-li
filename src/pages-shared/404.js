import { navigate } from "gatsby";
import { useEffect } from 'react';

export default function NotFoundPage() {

	// redirect to homepage
	useEffect(() => navigate('/'), []);

	return null;
}