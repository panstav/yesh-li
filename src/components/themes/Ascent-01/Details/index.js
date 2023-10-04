import { useContext } from "react";

import { PageContext } from "@config/Page";

import Main from "./Main";

import { details } from "./details.module.sass";

export default function Details () {
	const { content: { fullName } } = useContext(PageContext);

	return <div className={details}>
		<div className="is-flex-tablet is-flex-direction-column is-justify-content-center is-relative" style={{ minHeight: '100%', padding: '3rem 0' }}>

			<main>
				<Main />
			</main>

			<footer className="is-overlay has-text-centered mx-auto" style={{ top: 'unset' }}>
				<span className='is-size-7 has-text-grey-light'>© {new Date().getFullYear()} {fullName} כל הזכויות שמורות</span>
			</footer>

		</div>
	</div>;
}