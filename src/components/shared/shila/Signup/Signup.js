import classNames from 'classnames';

import { Checkmark } from '@elements/Icon';

import Heading from '@shared/shila/Heading';

export default function Form({ toAddress, formRef, className, heading, succeeded, successMessage, resetValidation, validation, handleSubmit, isSoldOut }) {
	return <form action={`https://formsubmit.co/${toAddress}`} method="POST" {...{ ref: formRef, className }}>
		<input type="text" name="_honey" style={{ display: 'none' }} />
		<input type="hidden" name="_next" value="" />
		<input type="hidden" name="_url" value=""></input>
		<Heading>{heading}:</Heading>
		{succeeded && <div className="notification p-4 is-success">{successMessage}.</div>}
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="name">שמי</label>
				<input onChange={resetValidation} className="input" type="text" name="name" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="phone">אפשר לחזור אליי למספר</label>
				<input onChange={resetValidation} className="input is-ltr" type="text" name="phone" />
			</div>
		</div>
		<div className="block">
			<div className="field">
				<label className="label" htmlFor="email">או בכתובת המייל</label>
				<input onChange={resetValidation} className="input" type="email" name="email" />
			</div>
		</div>
		{validation && <div className="notification p-4 mt-5 is-warning">אם תשאירו מייל או טלפון - נוכל גם לחזור אליכם 😉</div>}
		<button onClick={handleSubmit} className="button is-fullwidth is-primary has-text-white has-text-weight-bold mt-4">תחזרו אליי בבקשה</button>
		<p className='has-text-centered has-text-grey is-fullwidth is-size-7 mt-2'>
			{!isSoldOut && <span className='is-inline-block'><Check />נחזור אלייך בהקדם.</span>}
			<span className='is-inline-block'><Check />בלי ספאם.</span>
			{!isSoldOut && <span className='is-inline-block'><Check />אך ורק לצורך הסדנה.</span>}
		</p>
	</form>;

}

function Check({ className: classes, ...props }) {
	props.className = classNames('ml-1 mr-2 has-text-success', classes);
	return <Checkmark {...props} />;
}