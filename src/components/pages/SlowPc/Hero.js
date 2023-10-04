import { useContext, Fragment } from "react";

import Section from "@wrappers/Section";

import SubtleHeader from "./SubtleHeader";
import { PageContext } from "./contexts";
import { backgroundColorBlueLightStyle } from "./css";

export default function Hero () {
	const { description } = useContext(PageContext);
	return <div className="py-6" style={backgroundColorBlueLightStyle}>
		<Section withTopMargin={false} className="is-flex is-flex-direction-column is-align-items-center has-text-centered my-6">
			<SubtleHeader>האיפוס הגדול</SubtleHeader>
			<h1 className="title is-1 mt-3 mb-4">{description.reduce(addBreaks, [])}</h1>
			<p>מחזירים עטרה ליושנה עם טיפול 10000 למחשב.</p>{/* <br />{description} */}
			<a href="#signup" className="button is-info is-outlined mt-5">המחשב שלי צריך איפוס</a>
			<span className="is-size-8 has-text-grey mt-2">תוצאות משביעות או החזר מלא</span>
		</Section>
	</div>;
}

function addBreaks(accu, item, index, arr) {
	accu.push(<Fragment key={item}>{item}</Fragment>);
	// if not last add a br
	if (index !== arr.length - 1) accu.push(<br key={item + 'br'} />);
	return accu;
}
