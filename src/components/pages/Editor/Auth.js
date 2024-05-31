import { useState, useEffect, createContext } from 'react';

import { roles } from 'yeshli-shared';

import xhr from '@services/xhr';
import localDb from '@services/localDb';
import Loader from '@elements/Loader';
import snatchParameter from '@lib/snatch-parameter';

import Login from './Login';

const siteId = process.env.SITEID_TO_EDIT;

export const AuthContext = createContext();

export default function Auth({ children }) {

	const [user, setUser] = useState();

	useEffect(loginLogic, [user]);

	// we don't yet know if the user is logged in or not, show a loader till we do
	if (!user) return <Loader />;

	// user is neither logged in nor is trying to, start the login process
	if (user.role === roles.GUEST) return <Login jwtExpired={user.jwtExpired} />;

	user.siteId = siteId || user.sites[0];

	// user is logged in, render the editor
	return <AuthContext.Provider value={user}>
		{children}
	</AuthContext.Provider>;

	function loginLogic() {
		(() => {

			if (user) return;
			// user is not logged in

			// check if user is attempting to validate their email via an email link
			const emailVerificationCode = snatchParameter('emailVerificationCode');
			// check if user is attempting to login via an email link
			const loginCode = snatchParameter('loginCode');

			// user might attempting to login via an email link - send the code to the server to verify
			if (loginCode) return verifyLoginCode();

			// user is attempting to verify their email via an email link - send the code to the server to verify and if it is - reload the page so that the user get get an updated jwt
			if (emailVerificationCode) return verifyEmailVerificationCode();

			// user is to be identified
			return identifyUser();

			function identifyUser() {
				// we don't have a login code or an email verification code, but we might already have a jwt
				return xhr.getSession().then((data) => {
					if (data.jwtExpired || data.removeJwt) localDb.unset('jwt');
					setUser(data);
				});
			}

			function verifyLoginCode() {
				// we have a login code, send it to the server to verify and install a jwt
				return xhr.login(loginCode).then(({ jwt, ...user }) => {
					// we have a jwt, save it to localstorage and set the user
					localDb.set('jwt', jwt);
					setUser(user);
				}).catch(() => window.location.reload());
			}

			function verifyEmailVerificationCode() {
				// we have an email verification code, send it to the server to verify and if it is - reload the page so that the user get get an updated jwt
				return xhr.verifyCodeAndRegister(emailVerificationCode).then(({ isVerified }) => {
					if (!isVerified) return;
					localDb.set('email-recently-verified', true);
					window.location.reload();
				}).catch(() => window.location.reload());
			}

		})();
	}

}