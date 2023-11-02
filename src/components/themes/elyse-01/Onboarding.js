export default function Onboarding() {
	return [
		({ next }) => <>
			step1
			<button onClick={next}>next</button>
		</>,
		({ next }) => <>
			step2
			<button onClick={next}>next</button>
		</>,
	];
}