import Section from '@wrappers/Section';

export default function Hero() {
	return <div className="is-flex is-flex-direction-column is-align-items-center has-text-centered has-background-white pt-4 pb-2">
		<Logo />
		<Presenting />
	</div>;
}

function Presenting () {
	return <h2 className="has-text-weight-bold has-text-grey mt-1">
		<span className='is-size-5'>שילה אורינגר וקיבוץ סמר</span>
		<br />
		<span className='is-size-6'>מציגים:</span>
	</h2>;
}

function Logo() {
	return <img style={{ width: '6rem' }} src="https://storage.googleapis.com/yeshli-www/samar/logo-transparent-01.png" alt="לוגו קיבוץ סמר" />;
}