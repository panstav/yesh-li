import { useContext, useState } from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import FlexImage from "@elements/FlexImage";

import SectionTitle from "@domains/india4wdtours/elements/SectionTitle";
import AnnualWeather, { SingleWeather } from "@domains/india4wdtours/elements/WeatherAnnual";
import AttractionTags from "@domains/india4wdtours/elements/AttractionTags";
import Delimiter from "@domains/india4wdtours/elements/Delimiter";

import { isStackedBoxesTablet, pt4Tablet, pe4Tablet } from "@domains/india4wdtours/index.module.sass";

import RouteContext from "./context";

export default function Itinerary() {
	const { itinerary } = useContext(RouteContext);

	const [firstDestinationDate, setFirstDestinationDate] = useState(null);

	const startDatePickerProps = {
		wrapper: 'input',
		className: 'input is-small',
		type: 'date',
		onChange: (event) => setFirstDestinationDate(event.target.value),
		style: { width: 'auto' }
	};

	const titleClassName = classNames("h3 is-size-5 is-size-4-tablet pt-1 mb-3 reset-anchors", pt4Tablet);
	const boxClassName = classNames("box is-paddingless", pt4Tablet);
	const innerBoxClassName = classNames("box-inner is-flex-tablet is-align-items-top pb-4");
	const stepClassName = classNames("pt-3 px-3", pe4Tablet);

	return <>

		<SectionTitle aside={[startDatePickerProps]} >Schedule</SectionTitle>

		<div className={isStackedBoxesTablet}>
			{itinerary.map(({ title, subtitle, slug, featuredImage, daysAtLocation, weatherAnnual, tags, contentHtml }, index) => {
				const totalDaysNotIncluding = itinerary.slice(0, index).reduce((accu, { daysAtLocation }) => accu + daysAtLocation, 0);
				const totalDays = totalDaysNotIncluding + daysAtLocation;
				const destinationDate = firstDestinationDate ? new Date(firstDestinationDate).setDate(new Date(firstDestinationDate).getDate() + totalDaysNotIncluding) : null;
				return <div key={index} className={boxClassName} style={{ overflow: 'hidden' }}>
					<div id={`destination-${index + 1}`} className={innerBoxClassName}>

						<div className="is-hidden-tablet">
							<Link to={`/destination/${slug}`} className="is-block mb-2" style={{ height: '7rem' }}>
								<FlexImage {...featuredImage} />
							</Link>
							<div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-center mt-3 mb-5">
								<DestinationDatapoints
									routeItemIndex={index}
									routeItemDays={totalDays}
									weatherAnnual={weatherAnnual}
									destinationDate={destinationDate} />
							</div>
						</div>

						<div className="is-hidden-mobile is-flex is-flex-direction-column pt-4" style={{ paddingInlineEnd: '0.75em', paddingInlineStart: '1.25em' }}>

							<Link to={`/destination/${slug}`} className="is-inline-block is-size-4 is-size-1-tablet" style={{ borderRadius: '100%', overflow: 'hidden', width: '1.5em', height: '1.5em' }}>
								<FlexImage {...featuredImage} />
							</Link>

							<DestinationDatapoints
								routeItemIndex={index}
								routeItemDays={daysAtLocation}
								totalDays={totalDays}
								destinationDate={destinationDate}
								weatherAnnual={weatherAnnual}
								itemClassName="mt-3" />

						</div>
						<div className={stepClassName}>

							<h2 className={titleClassName} style={{ lineHeight: '1.5' }}>
								<Link to={`/destination/${slug}`}>
									{title}
								</Link>
							</h2>
							<p className="subtitle is-size-6 is-size-5-tablet">{subtitle}</p>
							<div>
								<AttractionTags tags={tags} />
							</div>

							<div className="content mt-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />

							<Link to={`/destination/${slug}`} className="button is-rounded is-small">Learn more</Link>
						</div>
					</div>
				</div>;
			})}
		</div>

	</>;
}

function DestinationDatapoints({ routeItemIndex, routeItemDays, destinationDate, weatherAnnual, itemClassName }) {
	const { itinerary } = useContext(RouteContext);

	const elevationProps = getElevationCharts();
	const formattedDate = destinationDate ? new Date(destinationDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).split(' ').reverse() : null;

	const { weatherAtRouteItemDate, monthIndex } = (() => {
		if (!destinationDate || !weatherAnnual?.length) return {};
		const monthIndex = new Date(destinationDate).getMonth();
		return { weatherAtRouteItemDate: weatherAnnual[monthIndex], monthIndex };
	})();

	const dateClassName = classNames('has-text-centered', itemClassName);
	const elevationClassName = classNames('is-flex', itemClassName);
	const itemStyle = { minWidth: '5rem', padding: '3px' };

	const gotElevation = Number(itinerary[routeItemIndex].elevationMeters) === itinerary[routeItemIndex].elevationMeters;

	return <>

		<span className={dateClassName} style={itemStyle}>
			<span className="is-size-3 has-text-grey" style={{ lineHeight: 1 }}>{formattedDate ? formattedDate[0] : routeItemDays}</span>
			<span className="is-size-6 has-text-weight-bold has-text-grey-light">{formattedDate ? formattedDate[1] : 'days'}</span>
		</span>

		{!weatherAnnual?.length ? null : <>
			<Delimiter />
			{destinationDate
				? <SingleWeather monthIndex={monthIndex} className={itemClassName} style={itemStyle} singleMonthLabelClassName="has-text-centered has-text-grey">{weatherAtRouteItemDate}</SingleWeather>
				: <AnnualWeather twoRows className={itemClassName} style={itemStyle}>
					{weatherAnnual}
				</AnnualWeather>}
		</>}

		{gotElevation && <>
			<Delimiter />
			<div>
				<div className={elevationClassName} style={{ height: '3rem', ...itemStyle }}>
					{elevationProps[routeItemIndex].map(({ elevationMeters, current, destinationIndex }, elevationIndex, arr) => {

						const chunkSize = Math.ceil((elevationMeters / Math.max(...arr.map(({ elevationMeters }) => elevationMeters))) * 100);

						const Wrapper = current ? 'div' : 'a';
						const props = current ? {} : { href: `#destination-${destinationIndex + 1}` };

						return <Wrapper {...props} key={elevationIndex} className="is-flex is-flex-direction-column w-100" style={{ opacity: current ? 1 : 0.25 }}>
							<div style={{ height: `calc(${100 - chunkSize}% + 0.5rem)` }}></div>
							<div className="has-background-info" style={{ height: `${chunkSize + 10}%` }}></div>
						</Wrapper>;
					})}
				</div>
				<div className="is-size-6 has-text-centered has-text-grey mt-1">{itinerary[routeItemIndex].elevationMeters}m</div>
			</div>
		</>}
	</>;

	function getElevationCharts() {
		return itinerary.reduce((accu, { elevationMeters }, index) => {
			if (Number(elevationMeters) !== elevationMeters) return accu.concat(null);

			const currentPush = [];

			// if there are previous charts, add some of their elevations to the current chart
			if (accu.length) {

				const prevFigures = itinerary.length - index > 2 ? Math.min(accu.length, 2) : Math.min(accu.length, 4);
				currentPush.push(...(accu[index - 1]||[]).slice(-(prevFigures)).map((item) => ({ ...item, current: false })));
			}

			// go through previous destinations' elevation and complete a 5-day chart
			accu.forEach((arr) => {
				if (!arr) return;
				if (arr.length < 5) arr.push({ elevationMeters, destinationIndex: index });
			});

			currentPush.push({ elevationMeters, destinationIndex: index, current: true });

			accu.push(currentPush);
			return accu;
		}, []);
	}

}