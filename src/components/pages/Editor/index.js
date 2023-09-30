import { useState, useEffect, createContext } from 'react';

import xhr from '@services/xhr';
import localDb from '@services/localDb';
import Loader from '@elements/Loader';

import { roles } from './variables';
import Login from './Login';
import Component from './Editor';

import { container } from './index.module.sass';

export const UserContext = createContext();

export const copy = {
	requiredField: 'שדה חובה',
	maxLengthField: (maxLength) => `מקסימום ${maxLength} תווים`,
	invalidUrl: 'כתובת האינטרנט לא תקינה',
	invalidPhoneNumber: 'מספר הטלפון אינו תקין',
	invalidEmail: 'כתובת האימייל אינה תקינה',
	submit: 'לשמור'
};

export default function Editor () {
	return <div className={container}>
		<AuthGate />
	</div>;
}

function AuthGate () {
	const [user, setUser] = useState();

	useEffect(() => {
		if (user) return;

		// user is not logged in
		// check if user is attempting to login but navigating from a login email to the editor
		const loginCode = snatchParameter('loginCode');

		if (loginCode) {
			// we have a login code, send it to the server to verify and install a jwt
			xhr.getLoginCodeVerification(loginCode).then(({ jwt, ...user }) => {
				// we have a jwt, save it to localstorage and set the user
				localDb.set('jwt', jwt);
				setUser(user);
			}).catch(() => window.location.reload());
		} else {
			// we don't have a login code, but we might already have a jwt
			xhr.getUserIdentity().then(setUser);
		}
	}, [user]);

	// we don't yet know if the user is logged in or not, show a loader till we do
	if (!user) return <Loader />;

	// user is neither logged in nor is trying to, start the login process
	if (user.role === roles.GUEST) return <Login />;

	// user is logged in, render the editor
	return <UserContext.Provider value={user}>
		<Component />
	</UserContext.Provider>;
}

function snatchParameter(paramName) {

	// Get the URLSearchParams
	const params = (new URL(document.location)).searchParams;

	// Get the value of the specified parameter
	const param = params.get(paramName);

	// If the parameter doesn't exist, return null
	if (!param) return null;

	// Remove the specified parameter
	params.delete(paramName);

	// Get the remaining parameters as a string
	const updatedParams = params.toString();

	// Update the URL without the specified parameter
	// remove ? if there are no parameters
	// (This is done to prevent the user from going back to the page with the parameter)
	window.history.replaceState({}, '', `${window.location.pathname}${updatedParams ? `?${updatedParams}` : ''}`);

	// Return the value of the parameter
	return param;
}