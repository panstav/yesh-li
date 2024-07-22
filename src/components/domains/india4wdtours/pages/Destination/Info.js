import { useContext } from "react";
import classNames from "classnames";

import DestinationContext from "./context";

import { dashedUnderline } from "@domains/india4wdtours/index.module.sass";
import AnnualWeather from "@domains/india4wdtours/elements/WeatherAnnual";
import InfoAside from "@domains/india4wdtours/elements/InfoAside";

const infoSnippetClassName = 'ms-1';

export default function Info(props) {
	return <InfoAside {...props}>
		<Elevation />
		<PermitRequired />
		<Connectivity />
		<Weather />
	</InfoAside>;
}

function Elevation() {
	const { elevationMeters } = useContext(DestinationContext);
	if (!elevationMeters) return null;

	const { safety, className: classes = '' } = Object.entries({
		'1500': { safety: 'Perfectly safe altitude' },
		'3500': { className: 'has-text-warning-dark', safety: 'High but safe, be cautious' },
		'5500': { className: 'has-text-danger', safety: 'High altitude, consult a doctor and equip yourself accordingly' },
		'Infinity': { className: 'has-text-danger', safety: 'Dangerous altitude, not recommended to the unexperienced' }
	}).reduce((accu, [key, value]) => {
		if (accu) return accu;
		if (elevationMeters < Number(key)) return value;
	}, null);

	const className = classNames(classes, infoSnippetClassName, dashedUnderline);

	return <div>
		Elevation: <span title={safety} className={className}>
			{elevationMeters}m
		</span>
	</div>;
}

function PermitRequired() {
	const { permitRequired } = useContext(DestinationContext);
	if (!permitRequired) return null;

	return <div>Permit required: <span className={infoSnippetClassName}>
		{permitRequired ? 'Yes' : 'No'}
	</span></div>;
}

function Connectivity() {
	const { connectivity } = useContext(DestinationContext);
	if (!connectivity) return null;

	const { desc, className: scoreClassName } = {
		'1': { className: 'has-text-danger', desc: 'Poor, don\'t expect internet, but you might get lucky' },
		'2': { className: 'has-text-danger', desc: 'Fair but unstable' },
		'3': { className: 'has-text-warning-dark', desc: 'Good for basic needs' },
		'4': { desc: 'Very Good, stable connection' },
		'5': { desc: 'Excellent, high-speed internet available' }
	}[String(connectivity)];

	const className = classNames(infoSnippetClassName, dashedUnderline);

	return <div>Connectivity: <span title={desc} className={className}>
		<span className={scoreClassName}>{connectivity}</span> / 5
	</span></div>;
}

function Weather() {
	const { weatherAnnual } = useContext(DestinationContext);
	if (!weatherAnnual?.length) return null;

	return <div>Annual Weather: <AnnualWeather className="mt-1" style={{ gap: '0.1rem' }}>
		{weatherAnnual}
	</AnnualWeather></div>;
}