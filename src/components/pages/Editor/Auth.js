import { useState, useEffect, createContext } from 'react';

import xhr from '@services/xhr';
import localDb from '@services/localDb';
import Loader from '@elements/Loader';
import snatchParameter from '@lib/snatch-parameter';

import Login from './Login';

import './index.sass';

const siteId = process.env.SITEID_TO_EDIT;

const roles = {
	GUEST: 'GUEST',
	EDITOR: 'EDITOR',
	ADMIN: 'ADMIN'
};

export const AuthContext = createContext();

export default function Auth({ children }) {

	const [user, setUser] = useState();

	useEffect(() => {
		if (user) return;
		// user is not logged in

		// check if user is attempting to validate their email via an email link
		const emailVerificationCode = snatchParameter('emailVerificationCode');
		// check if user is attempting to login via an email link
		const loginCode = snatchParameter('loginCode');

		if (loginCode) {
			// we have a login code, send it to the server to verify and install a jwt
			xhr.login(loginCode).then(({ jwt, ...user }) => {
				// we have a jwt, save it to localstorage and set the user
				localDb.set('jwt', jwt);
				setUser(user);
			}).catch(() => window.location.reload());

		} else if (emailVerificationCode) {
			// we have an email verification code, send it to the server to verify and if it is - reload the page so that the user get get an updated jwt
			xhr.verifyCodeAndRegister(emailVerificationCode).then(({ isVerified }) => {
				if (!isVerified) return;
				localDb.set('email-recently-verified', true);
				window.location.reload();
			}).catch(() => window.location.reload());
		} else {

			// we don't have a login code or an email verification code, but we might already have a jwt
			xhr.getSession().then((data) => {
				if (data.jwtExpired || data.removeJwt) localDb.unset('jwt');
				setUser(data);
			});
		}
	}, [user]);

	// we don't yet know if the user is logged in or not, show a loader till we do
	if (!user) return <Loader />;

	// user is neither logged in nor is trying to, start the login process
	if (user.role === roles.GUEST) return <Login jwtExpired={user.jwtExpired} />;

	user.siteId = siteId || user.sites[0];

	// user is logged in, render the editor
	return <AuthContext.Provider value={user}>
		{children}
	</AuthContext.Provider>;
}