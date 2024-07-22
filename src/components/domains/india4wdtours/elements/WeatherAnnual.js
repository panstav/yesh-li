import { useState } from "react";
import classNames from "classnames";

const colorHexByTemperature = {
	'0': '#4d00ff',
	'5': '#007fff',
	'10': '#1e90ff',
	'15': '#62b4ff',
	'20': '#00dacf',
	'25': '#a2e439',
	'35': '#ffff00',
	'40': '#ff9933',
	'Infinity': '#ff6a00'
};

export default function AnnualWeather({ twoRows, className, style, children: weatherAnnual }) {
	if (!weatherAnnual?.length) return null;

	const [zoomedMonthIndex, setZoomedMonthIndex] = useState(false);
	const zoomOnIndex = (index) => () => setZoomedMonthIndex(index);

	if (zoomedMonthIndex) {
		return <SingleWeather onClick={() => setZoomedMonthIndex()} monthIndex={zoomedMonthIndex} className={className}>
			{weatherAnnual[zoomedMonthIndex]}
		</SingleWeather>;
	}

	if (!twoRows) {
		const props = {};

		const weatherArray = zoomedMonthIndex ? weatherAnnual[zoomedMonthIndex] : weatherAnnual;

		return <WeatherRow {...{ className, style }}>
			{weatherArray.map((month, index) => {
				return <MonthlyWeather key={index} onClick={zoomOnIndex(index)} itemIndex={index} temps={month} {...props} />;
			})}
		</WeatherRow>;
	}

	const halfOfLength = Math.ceil(weatherAnnual.length / 2);

	return <div {...{ className, style }}>
		<WeatherRow>
			{weatherAnnual.filter((item, index) => index < halfOfLength).map((month, index) => {
				return <MonthlyWeather key={index} itemIndex={index} onClick={zoomOnIndex(index)} temps={month} />;
			})}
		</WeatherRow>
		<WeatherRow>
			{weatherAnnual.filter((item, index) => index >= halfOfLength).map((month, index) => {
				return <MonthlyWeather key={index} itemIndex={index + halfOfLength} onClick={zoomOnIndex(index + halfOfLength)} temps={month} />;
			})}
		</WeatherRow>
	</div>;
}

export function SingleWeather({ onClick, className: classes, style, monthIndex, singleMonthLabelClassName, children: weatherPoint }) {
	if (!weatherPoint) return null;

	const className = classNames("is-flex is-justify-content-center is-align-items-center is-flex-direction-column has-text-centered has-text-grey", classes, onClick ? 'is-clickable' : '');

	// full name of month
	const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });

	return <div {...{ onClick, className, style }}>
		<MonthlyWeather itemIndex={monthIndex} temps={weatherPoint} />
		<div className={singleMonthLabelClassName}>{monthName} <span style={{ textWrap: 'nowrap' }}>{weatherPoint[1]}-{weatherPoint[0]}℃</span></div>
	</div>;

}

function MonthlyWeather({ itemIndex, onClick: onClickHandler, temps: [high, low] }) {

	const avgCelsius = (high + low) / 2;
	const monthName = new Date(0, itemIndex).toLocaleString('default', { month: 'long' });

	const color = Object.entries(colorHexByTemperature).reduce((accu, [key, value]) => {
		if (accu) return accu;
		if (avgCelsius < Number(key)) return value;
	}, null);

	const props = {
		key: itemIndex,
		title: `${monthName}: High: ${high}°C, Low: ${low}°C`,
		className: "has-radius is-clickable",
		style: { width: '100%', height: '0.75em', backgroundColor: color, border: '1px solid white', display: 'inline-block' }
	};

	if (onClickHandler) props.onClick = onClickHandler;

	return <span {...props} />;
}

function WeatherRow({ className: classes, style, children }) {
	const className = classNames('is-flex', classes);
	return <span className={className} style={{ textWrap: 'nowrap', ...style }}>
		{children}
	</span>;
}