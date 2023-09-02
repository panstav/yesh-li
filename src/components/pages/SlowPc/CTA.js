import { useRef, useState, useCallback, useContext } from 'react';
import classNames from 'classnames';

import { trackConversion } from '@lib/track-events';
import { Checkmark } from '@elements/Icon';
import Section from '@wrappers/Section';

import { SubtleHeader } from '.';
import { blueLightColor } from './css';

const basePrice = 1100;
const additionalDevicePrice = 600;
const conversionId = 'iszkCKe_g5IYEL3xkrYp';

export default function CTA () {

	const [devicesNumber, setDevicesNumber] = useState(1);
	const price = basePrice + ((devicesNumber - 1) * additionalDevicePrice);

	const formName = `signup-savviors-makeover`;

	const formRef = useRef(null);
	const [validation, setValidation] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const resetValidation = useCallback(() => {
		setValidation(false);
	}, [setValidation]);

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		const { phone, email } = formRef.current.elements;

		if (!phone.value && !email.value) return setValidation(true);

		const formElem = formRef.current;
		const formData = new FormData(formElem);

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString(),
		}).then(() => {
			setSucceeded(true);
			trackConversion(conversionId);
		});

	}, [formRef, setValidation, setSucceeded]);

	return <div style={{ position: 'relative', marginTop: '8rem' }}>
		<div style={{
			margin: 'auto',
			filter: 'blur(100px)',
			borderRadius: '100%',
			position: 'absolute',
			top: '0',
			bottom: '0',
			right: '0',
			left: '0',
			width: '1000px',
			height: '1000px',
			opacity: '0.1',
			backgroundColor: '#008f8f',
			zIndex: '-10'
		}} />
		<Section id="signup" className='is-medium pt-6'>
			<div className='has-text-centered mb-5'>
				<SubtleHeader>זהו, כאן נרשמים</SubtleHeader>
			</div>
			<div className='has-background-white py-5' style={{ borderRadius: '0.5rem' }}>
				{/* eslint-disable-next-line react/no-unknown-property */}
				<form name={formName} method="POST" {...{ ref: formRef }} netlify="true" className='px-3'>
					<input type="hidden" name="form-name" value={formName} />
					<div className="block">
						<div className="field">
							<label className="label" htmlFor="signup-name">שמי:</label>
							<input onChange={resetValidation} className="input" type="text" name="name" id="signup-name" />
						</div>
					</div>
					<div className="block">
						<div className="field">
							<label className="label" htmlFor="signup-phone">אפשר לחזור אליי למספר:</label>
							<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" id="signup-phone" />
						</div>
					</div>
					<div className="block">
						<div className="field">
							<label className="label" htmlFor="signup-email">או לכתובת המייל:</label>
							<input onChange={resetValidation} className="input" type="email" name="email" id="signup-email" />
						</div>
					</div>
					<div className="block">
						<div className="field is-flex is-align-items-center">
							<label className="label" htmlFor="signup-devices-number">מספר המכשירים לאיפוס:</label>
							<span className='mx-4'>{devicesNumber}</span>
							<input className="slider is-flex-grow-1 is-info px-4" step="1" min="1" max="3" defaultValue={devicesNumber} type="range" name="devices-number" id="signup-devices-number" onChange={(event) => setDevicesNumber(event.target.value)} />
						</div>
						<div className='has-text-centered mt-3'>
							<div style={{ lineHeight: 1 }}>
								<span className='mr-1'>₪</span>
								<span className='is-size-1'>{price}</span>
							</div>
							<span className='is-size-7 has-text-grey'>עד 12 תשלומים</span>
						</div>
					</div>
					{validation && <div className="notification has-background-warning-light p-4 mt-5">הרשמו לפחות עם כתובת מייל או טלפון.</div>}
					{succeeded && <div className="notification has-background-success-light p-4">מעולה, נשתמע!</div>}
					<button onClick={handleSubmit} className="button is-justify-content-center is-fullwidth has-text-white has-text-weight-bold mt-4" style={{ background: `linear-gradient(to right, ${blueLightColor} 0%, #3e8ed0 51%, ${blueLightColor} 100%)` }}>אשמח שתיצרו קשר</button>
					<p className='has-text-centered is-fullwidth is-size-7 mt-2'>
						<span className='is-inline-block'><Check />נחזור אלייך בהקדם.</span>
						<span className='is-inline-block'><Check />בלי ספאם.</span>
						<span className='is-inline-block'><Check />אך ורק לצורך האיפוס.</span>
					</p>
				</form>
			</div>
		</Section>
	</div>;

}

function Check({ className: classes, ...props }) {
	props.className = classNames('ml-1 mr-2 has-text-info', classes);
	return <Checkmark {...props} />;
}